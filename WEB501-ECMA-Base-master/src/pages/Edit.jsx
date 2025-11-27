import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`http://localhost:3000/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch(() => toast.error("Không tìm thấy tour"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTour({
      ...tour,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    })
      .then(() => {
        toast.success("Cập nhật tour thành công!");
        navigate("/list");
      })
      .catch(() => toast.error("Có lỗi khi cập nhật!"));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
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
        </button>
      </form>
    </div>
  );
}

export default EditPage;
