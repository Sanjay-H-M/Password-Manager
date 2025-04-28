import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./Manager.css"
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to Clipboard');
    }

    const showPassword = () => {
        if (ref.current.src.includes("/eyecross.png")) {
            passwordref.current.type = "password"
            ref.current.src = "/eye.png";
        } else {
            passwordref.current.type = "text"
            ref.current.src = "/eyecross.png";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
            const newPassword = { ...form, id: uuidv4() }
            setPasswordArray([...passwordArray, newPassword])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]))
            setForm({ site: "", username: "", password: "" })
            toast.success("Password saved successfully")
        } else {
            toast.error("Password not saved. Fill all fields properly.")
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast.success("Password deleted successfully!");
        } else {
            toast.info("Deletion cancelled.");
        }
    }

    const editPassword = (id) => {
        const editingItem = passwordArray.find(item => item.id === id);
        setForm(editingItem);
        const updatedArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer className="toast-container-with-padding" position="top-right" draggable={true} />
            <div className="container px-4 md:px-40 py-16 mx-auto min-h-[90vh]">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-blue-500">&lt;</span>
                    Pass
                    <span className="text-blue-500">OP/&gt;</span>
                </h1>
                <p className="text-blue-900 text-lg text-center">Your own Password Manager</p>

                {/* Form Section */}
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-blue-500 w-full px-4 py-2"
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="rounded-full border border-blue-500 w-full md:w-1/2 px-4 py-2"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative w-full md:w-1/2">
                            <input
                                ref={passwordref}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="rounded-full border border-blue-500 w-full px-4 py-2"
                                type="password"
                                name="password"
                                id="password"
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer"
                                onClick={showPassword}
                            >
                                <img ref={ref} width={26} className="p-1" src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-blue-500 rounded-full px-6 py-2 hover:bg-blue-400 gap-2 border border-blue-900"
                    >
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        SAVE
                    </button>
                </div>

                {/* Password List Section */}
                <div className="passwords mt-10">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 ? (
                        <div>No passwords to show</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
                                <thead className="bg-blue-800 text-white">
                                    <tr>
                                        <th className="py-2 border border-white">SITE</th>
                                        <th className="py-2 border border-white">USERNAME</th>
                                        <th className="py-2 border border-white">PASSWORD</th>
                                        <th className="py-2 border border-white">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-blue-100">
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 border border-white text-center max-w-[200px] overflow-x-auto">
                                                <div className="flex  flex-col  sm:flex-row items-center justify-center gap-2">
                                                    <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.site)}>
                                                        <lord-icon style={{ width: "20px", height: "20px", paddingTop: "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex flex-col  sm:flex-row items-center justify-center gap-2">
                                                    <span>{item.username}</span>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.username)}>
                                                        <lord-icon style={{ width: "20px", height: "20px", paddingTop: "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex flex-col  sm:flex-row items-center justify-center gap-2">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.password)}>
                                                        <lord-icon style={{ width: "20px", height: "20px", paddingTop: "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                                    <span className="cursor-pointer" onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="click"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                    <span className="cursor-pointer" onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="click"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Manager
