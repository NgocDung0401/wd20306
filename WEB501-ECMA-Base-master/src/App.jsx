<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";
import ProtectedRoute from "./components/ProtectedRoute";
  import toast from "react-hot-toast";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công!");
  };

=======
import { Toaster } from "react-hot-toast";
import { Link, Routes } from "react-router-dom";
import ListPage from "./pages/List";
import { BrowserRouter, Route, Router } from "react-router-dom";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";



function App() {
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
<<<<<<< HEAD
          <Link
            to={isLoggedIn ? "/list" : "/login"}
            className="text-xl font-semibold"
          >
=======
          <Link to="#" className="text-xl font-semibold">
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
<<<<<<< HEAD
            <Link
              to={isLoggedIn ? "/list" : "/login"}
              className="hover:text-gray-200"
            >
              Trang chủ
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/list" className="hover:text-gray-200">
                  Danh sách
                </Link>
                <Link to="/add" className="hover:text-gray-200">
                  Thêm mới
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-gray-200 bg-transparent border-none text-white"
              >
                Đăng xuất
              </button>
            )}
=======
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>
      </div>

      <Toaster />
      <Routes>
<<<<<<< HEAD
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/list"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour/:id/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditPage />
            </ProtectedRoute>
          }
        />
=======
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/tour/:id/edit" element={<EditPage />} />
>>>>>>> 680dd63bebb96bed9a7b1b97360f006bf1a4ed89
      </Routes>
    </>
  );
}

export default App;
