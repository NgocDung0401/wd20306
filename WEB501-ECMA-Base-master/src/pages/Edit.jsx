import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const validateTour = (tour) => {
  const errors = {};

  if (!tour.name.trim()) errors.name = "Tên tour không được để trống";
  else if (tour.name.length < 5 || tour.name.length > 100)
    errors.name = "Tên tour phải từ 5 - 100 ký tự";

  if (!tour.destination.trim()) errors.destination = "Địa điểm không được để trống";
  else if (tour.destination.length < 2 || tour.destination.length > 50)
    errors.destination = "Địa điểm phải từ 2 - 50 ký tự";

  if (!tour.duration.trim()) errors.duration = "Thời gian không được để trống";

  if (tour.price === "" || tour.price === null) errors.price = "Giá tour bắt buộc";
  else if (Number(tour.price) <= 0) errors.price = "Giá phải lớn hơn 0";

  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!tour.image.trim()) errors.image = "URL hình ảnh không được để trống";
  else if (!urlRegex.test(tour.image)) errors.image = "URL hình ảnh không hợp lệ";

  if (!tour.description.trim()) errors.description = "Mô tả không được để trống";
  else if (tour.description.length < 10 || tour.description.length > 1000)
    errors.description = "Mô tả phải từ 10 - 1000 ký tự";

  if (tour.available === "" || tour.available === null)
    errors.available = "Số lượng chỗ trống bắt buộc";
  else if (Number(tour.available) < 0)
    errors.available = "Số lượng không được nhỏ hơn 0";

  if (!tour.category) errors.category = "Hãy chọn loại tour";
  else if (!["tour nội địa", "tour quốc tế"].includes(tour.category))
    errors.category = "Loại tour không hợp lệ";

  return errors;
}

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch(() => toast.error("Không tìm thấy tour!"));
  }, [id]);

  if (!tour) return <p className="p-6">Đang tải...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTour({
      ...tour,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTour(tour);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Vui lòng kiểm tra thông tin!");
      return;
    }

    fetch(`http://localhost:3000/tours/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tour),
    })
      .then(() => {
        toast.success("Cập nhật tour thành công!");
        navigate("/list");
      })
      .catch(() => toast.error("Lỗi khi cập nhật!"));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Tên tour</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={tour.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Địa điểm</label>
          <input
            type="text"
            name="destination"
            className="border p-2 w-full"
            value={tour.destination}
            onChange={handleChange}
          />
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination}</p>
          )}
        </div>

        <div>
          <label>Thời gian</label>
          <input
            type="text"
            name="duration"
            className="border p-2 w-full"
            value={tour.duration}
            onChange={handleChange}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>

        <div>
          <label>Giá tour</label>
          <input
            type="number"
            name="price"
            className="border p-2 w-full"
            value={tour.price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div>
          <label>URL hình ảnh</label>
          <input
            type="text"
            name="image"
            className="border p-2 w-full"
            value={tour.image}
            onChange={handleChange}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        <div>
          <label>Mô tả</label>
          <textarea
            name="description"
            rows="4"
            className="border p-2 w-full"
            value={tour.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <label>Số chỗ trống</label>
          <input
            type="number"
            name="available"
            className="border p-2 w-full"
            value={tour.available}
            onChange={handleChange}
          />
          {errors.available && (
            <p className="text-red-500 text-sm">{errors.available}</p>
          )}
        </div>

        <div>
          <label>Loại tour</label>
          <select
            name="category"
            className="border p-2 w-full"
            value={tour.category}
            onChange={handleChange}
          >
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>



        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
