import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./Manager.css"
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to Clipboard');
    }

    const showPassword = () => {
        passwordref.current.type = "text"
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
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast.success("Password saved successfully")
        } else {
            toast.error("Password not saved")
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast.success("Password deleted successfully!");
        } else {
            toast.info("Deletion cancelled.");
        }
    }
    const editPassword = (id) => {
        console.log("editing the password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <ToastContainer className="toast-container-with-padding" position='top-right' draggable={true} />
            <div className="container px-40 py-16 mx-auto min-h-[90vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-blue-500'> &lt;</span>
                    Pass
                    <span className='text-blue-500'>OP/&gt;</span>
                </h1>
                <p className='text-blue-900 text-lg text-center'>Your own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-500 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-blue-500 w-full px-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-blue-500 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[8px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} className='p-1' src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-blue-500 rounded-full px-6 py-2 w-fit hover:bg-blue-400 gap-2 border border-blue-900'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        SAVE
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
                        <thead className='bg-blue-800 text-white'>
                            <tr>
                                <th className='py-2 border border-white '>SITE</th>
                                <th className='py-2 border border-white '>USERNAME</th>
                                <th className='py-2 border border-white '>PASSWORD</th>
                                <th className='py-2 border border-white '>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center gap-1 px-2 overflow-x-hidden max-w-[200px]'>
                                        <div className="flex items-center justify-center">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }} src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center flex items-center justify-center gap-3'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="click"
                                                style={{ "width": "25px", "height": "25px" }}
                                                className="">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="click"
                                                style={{ "width": "25px", "height": "25px" }}
                                                className="">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
