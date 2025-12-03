import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) err.email = "Email không được để trống";
    else if (!emailRegex.test(email)) err.email = "Email không hợp lệ";

    if (!password.trim()) err.password = "Mật khẩu không được để trống";
    else if (password.length < 6) err.password = "Mật khẩu phải ≥ 6 ký tự";

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

    if (setIsLoggedIn) {
      setIsLoggedIn(true);
    }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.accessToken) {
          toast.error("Sai email hoặc mật khẩu!");
          return;
        }

        // LƯU TOKEN VÀO LOCALSTORAGE
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Đăng nhập thành công!");
        navigate("/list");
      })
      .catch(() => toast.error("Đăng nhập thất bại!"));
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Đăng nhập
        </button>

        <p className="text-center text-sm mt-2">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
