import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

<<<<<<< HEAD
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

=======
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

<<<<<<< HEAD
  const [tour, setTour] = useState(null);
  const [errors, setErrors] = useState({});
=======
  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "",
    active: true,
  });
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89

  useEffect(() => {
    fetch(`http://localhost:3000/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
<<<<<<< HEAD
      .catch(() => toast.error("Không tìm thấy tour!"));
  }, [id]);

  if (!tour) return <p className="p-6">Đang tải...</p>;

=======
      .catch(() => toast.error("Không tìm thấy tour"));
  }, [id]);

>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTour({
      ...tour,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
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
=======
    if (
      !tour.name ||
      !tour.destination ||
      !tour.duration ||
      !tour.price ||
      !tour.image ||
      !tour.description ||
      !tour.available ||
      !tour.category
    ) {
      return toast.error("Vui lòng điền đầy đủ thông tin!");
    }

    const formattedTour = {
      ...tour,
      price: Number(tour.price),
      available: Number(tour.available),
    };

    fetch(`http://localhost:3000/tours/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedTour),
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
    })
      .then(() => {
        toast.success("Cập nhật tour thành công!");
        navigate("/list");
      })
<<<<<<< HEAD
      .catch(() => toast.error("Lỗi khi cập nhật!"));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Chỉnh sửa Tour</h1>
=======
      .catch(() => toast.error("Có lỗi khi cập nhật!"));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Tour</h2>
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
<<<<<<< HEAD
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
=======
          <label className="font-semibold">Tên tour</label>
          <input
            type="text"
            name="name"
            value={tour.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Địa điểm</label>
          <input
            type="text"
            name="destination"
            value={tour.destination}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={tour.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Giá</label>
          <input
            type="number"
            name="price"
            value={tour.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={tour.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <label className="font-semibold">Mô tả</label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Số lượng còn</label>
          <input
            type="number"
            name="available"
            value={tour.available}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Loại tour</label>
          <select
            name="category"
            value={tour.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Chọn loại tour --</option>
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={tour.active}
            onChange={handleChange}
          />
          <label>Đang hoạt động</label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Lưu thay đổi
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
        </button>
      </form>
    </div>
  );
}

export default EditPage;
