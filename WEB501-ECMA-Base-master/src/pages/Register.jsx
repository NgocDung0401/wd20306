import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.name.trim()) err.name = "Tên không được để trống";

    if (!user.email.trim()) err.email = "Email không được để trống";
    else if (!emailRegex.test(user.email)) err.email = "Email không hợp lệ";

    if (!user.password.trim()) err.password = "Mật khẩu không được để trống";
    else if (user.password.length < 6) err.password = "Mật khẩu phải ≥ 6 ký tự";

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      toast.error("Vui lòng kiểm tra lại!");
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      })
      .catch(() => toast.error("Đăng ký thất bại!"));
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Họ tên</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Đăng ký
        </button>

        <p className="text-center text-sm mt-2">
          Đã có tài khoản? <Link to="/login" className="text-blue-600">Đăng nhập</Link>
        </p>

      </form>
    </div>
  );
}

export default RegisterPage;
