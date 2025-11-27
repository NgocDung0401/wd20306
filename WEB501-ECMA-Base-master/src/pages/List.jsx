import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch(() => toast.error("Không thể tải danh sách tour"));
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Bạn có chắc muốn xóa tour này?")) return;

    fetch(`http://localhost:3000/tours/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Xóa thành công!");
        setTours(tours.filter((t) => t.id !== id));
      })
      .catch(() => toast.error("Lỗi khi xóa!"));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên Tour</th>
              <th className="px-4 py-2 border">Địa điểm</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Loại</th>
              <th className="px-4 py-2 border">Active</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>

                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border font-semibold">{tour.name}</td>

                <td className="px-4 py-2 border">{tour.destination}</td>

                <td className="px-4 py-2 border">{tour.duration}</td>

                <td className="px-4 py-2 border text-green-600 font-bold">
                  {tour.price.toLocaleString()} đ
                </td>

                <td className="px-4 py-2 border">{tour.available}</td>

                <td className="px-4 py-2 border">{tour.category}</td>

                <td className="px-4 py-2 border">
                  {tour.active ? (
                    <span className="text-green-600 font-semibold">✔</span>
                  ) : (
                    <span className="text-red-600 font-semibold">✘</span>
                  )}
                </td>

                <td className="px-4 py-2 border flex flex-col gap-2">
                  <Link
                    to={`/tour/${tour.id}/edit`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-center"
                  >
                    Sửa
                  </Link>

                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
