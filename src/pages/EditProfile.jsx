import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import DeactivateAccountModal from "../components/modals/DeactivateAccountModal";
import { Link } from "react-router-dom";
import { useState } from "react";
const EditProfile = () => {

    const [openDeactivateModal, setOpenDeactivateModal] = useState(false);


    return (
        <div className="text-primary w-full h-screen flex flex-col items-start py-10">  
            <Link to={'/home'}>
                <div className="w-full flex flex-row gap-2">
                    <ArrowLeftOutlined />
                    <p>Back to profile</p>
                </div>
            </Link>
            <div className="w-full h-8/12 flex justify-center ">
                <div className="w-3xl h-full flex justify-center">
                    <div className="w-4/12 h-full flex items-center">
                        <span className="w-fit h-fit flex flex-col items-center gap-2">
                            <img
                                src="https://via.assets.so/img.jpg?w=184&h=184&bg=e5e7eb&f=png"
                                alt="Place Holder"
                                className="h-46 w-46 rounded-full"
                            /> 
                            <button className="w-fit text-secondary border-2 border-secondary py-2 px-2 text-sm rounded-[10px]">
                                Upload new photo
                            </button>
                        </span>
                    </div>
                    <div className="w-8/12 h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-full flex items-center justify-between">
                            <h4 className="text-5xl font-bold">Edit Profile</h4>
                            <button className="text-red-400 flex gap-2">
                                <DeleteOutlined />
                                Clear all
                            </button>
                        </div>
                        <form className="w-full flex flex-col gap-4"action="">
                            <input type="text" name="text" id="" placeholder="Enter Username (e.g @superjames)" className="w-full bg-gray-200 py-2 px-2 rounded-sm "/>
                            <input type="number" name="number" id="" placeholder="Enter Age (e.g 21)" className="w-full bg-gray-200 py-2 px-2 rounded-sm "/>
                            <input disabled type="email" name="email" id="" placeholder="Enter Email Address (e.g jamesmith@gmail.com)" className="w-full bg-gray-200 py-2 px-2 rounded-sm "/>
                            <span className="w-full flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {setOpenDeactivateModal(true)}}
                                    className="w-6/12 text-red-400 border-2 border-redtext-red-400 py-2 px-2 text-md font-bold rounded-[10px]">
                                    Deactivate Account
                                </button>
                                <button
                                    className="w-6/12 text-white border-2 bg-secondary py-2 px-2 text-md font-bold rounded-[10px]">
                                    Update Account
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>

            <DeactivateAccountModal 
                openModal={openDeactivateModal}
            />
        </div>
    );

}

export default EditProfile;