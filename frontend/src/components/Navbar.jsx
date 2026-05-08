import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <Link to="/">
        <h1 className="font-bold text-2xl">E-Commerce</h1>
      </Link>

      <div className="space-x-5">
        {!user && (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "customer" && (
              <Link to="/customer-dashboard">Dashboard</Link>
            )}

            {user.role === "merchant" && (
              <Link to="/merchant-dashboard">Dashboard</Link>
            )}

            {user.role === "admin" && (
              <Link to="/admin-dashboard">Dashboard</Link>
            )}
            <span>{user.username}</span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
