import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("family");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/accounts/signup/", {
                username,
                email,
                password,
                role,
            }, {
                headers: { "Content-Type": "application/json" }
            });

            console.log(response.data);

            // Store the user data in localStorage (optional if auto-login is intended)
            const userData = {
                username: response.data.username,
                role: response.data.role,
                email: response.data.email,
                id: response.data.id
            };
            localStorage.setItem("user", JSON.stringify(userData));

            // 🔁 Notify Navbar of login state change
            window.dispatchEvent(new Event("storageUpdate"));

            // Redirect to login (or directly to home if auto-login)
            navigate("/");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setErrorMsg(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">Create Account</p>
                <p>Please sign up to book an appointment</p>

                {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                <div className="w-full">
                    <p>Username</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="w-full relative">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="w-full">
                    <p>Role</p>
                    <select
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="family">Family</option>
                        <option value="caregiver">Caregiver</option>
                    </select>
                </div>

                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    Create Account
                </button>

                <p>
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-primary underline cursor-pointer"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Signup;
