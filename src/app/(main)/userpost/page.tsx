import React from 'react'

const userPost = () => {

    const inputStyle = "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
    return (
        <div className='lg:px-20 px-0 pt-2'>
            <div className='w-full bg-black px-1 py-2 rounded-md'>
                <div className='w-full bg-white max-w-xl m-auto p-5 flex rounded-md flex-col border-2 border-red-300'>
                    <h1 className='teext-black text-3xl text-center'>User information</h1>
                    <form className='w-full py-3 flex flex-col'>
                        <div className='flex flex-col'>
                            <label>Title</label>
                            <input type="text" name='title' placeholder='enter your title' className={inputStyle} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Description</label>
                            <input type="text" name='description' placeholder='enter your description' className={inputStyle} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Caterory</label>
                            <input type="text" name='caterory' placeholder='enter your company' className={inputStyle} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Company</label>
                            <input type="text" name='company' placeholder='enter your company' className={inputStyle} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Mobile Number</label>
                            <input type="text" name='numder' placeholder='enter your mobile number' className={inputStyle} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Quinty</label>
                            <input type="number" name='quinty' placeholder='enter your Quinty' className={inputStyle} />
                        </div>

                        <div className='flex flex-col'>
                            <label>Upload</label>
                            <input type="file" name='image' placeholder='enter your Quinty' className={inputStyle} />
                        </div>

                        <button
                            type="submit"
                            className="w-full hover:scale-105 transition-all duration-300 m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default userPost