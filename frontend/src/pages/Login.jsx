import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide React icons

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                console.log(response.data);
                alert("Login successful!");

                const userData = { username };
                localStorage.setItem("user", JSON.stringify(userData));

                navigate("/");
            } else {
                throw new Error("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setErrorMsg(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">Login</p>
                <p>Please log in to book an appointment</p>

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

                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
