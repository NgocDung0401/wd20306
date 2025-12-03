import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch(() => toast.error("Không thể tải danh sách tour"));
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Bạn có chắc muốn xóa tour này?")) return;

    fetch(`http://localhost:3000/tours/${id}`, { method: "DELETE" })
      .then(() => {
        toast.success("Xóa thành công!");
        setTours(tours.filter((t) => t.id !== id));
      })
      .catch(() => toast.error("Lỗi khi xóa!"));
  };

  const handleToggleActive = (tour) => {
    const updated = { ...tour, active: !tour.active };

    fetch(`http://localhost:3000/tours/${tour.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: updated.active }),
    })
      .then(() => {
        setTours((prev) =>
          prev.map((item) => (item.id === tour.id ? updated : item))
        );
        toast.success(
          updated.active ? "Tour đang hoạt động" : "Tour đã ngưng hoạt động"
        );
      })
      .catch(() => toast.error("Không thể cập nhật trạng thái!"));
  };

  const filteredTours = tours.filter((tour) => {
    const matchSearch = tour.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "all" ? true : tour.category === categoryFilter;
    const matchActive =
      activeFilter === "all"
        ? true
        : activeFilter === "true"
        ? tour.active === true
        : tour.active === false;

    return matchSearch && matchCategory && matchActive;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên tour..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="all">Tất cả loại tour</option>
          <option value="tour nội địa">Tour nội địa</option>
          <option value="tour quốc tế">Tour quốc tế</option>
        </select>

        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="true">Đang hoạt động</option>
          <option value="false">Ngưng hoạt động</option>
        </select>
      </div>

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
            {filteredTours.map((tour) => (
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
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={tour.active}
                      onChange={() => handleToggleActive(tour)}
                    />
                    <div
                      className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 
                                    relative after:content-[''] after:absolute after:top-[3px] 
                                    after:left-[3px] after:bg-white after:h-5 after:w-5 
                                    after:rounded-full after:transition-all 
                                    peer-checked:after:translate-x-full"
                    ></div>
                  </label>
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

            {filteredTours.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  Không tìm thấy tour phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
