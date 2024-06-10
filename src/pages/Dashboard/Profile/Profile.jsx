import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../../../api/utils/index";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.email) {
        try {
          const response = await fetch(
            `http://localhost:3000/allEmployees/${user?.email}`
          );
          const data = await response.json();
          setProfileData(data[0]);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [user?.email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const imageUrl = await imageUpload(image);
        await fetch(`http://localhost:3000/updateProfile/${user?.email}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageUrl }),
        });

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          image: imageUrl,
        }));
        setModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Profile photo updated successfully",
          icon: "success",
        });
      } catch (error) {
        console.error("Error updating profile photo:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update profile photo",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="bg-blue-500 text-white text-center py-4">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={profileData?.image || "https://via.placeholder.com/100"}
              alt="User profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full"
              onClick={() => setModalOpen(true)}
            >
              ✏️
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{profileData?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <strong>Role:</strong>
            <span>{profileData?.role}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <strong>Salary:</strong>
            <span>${profileData?.salary}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <strong>Designation:</strong>
            <span>{profileData?.designation}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <strong>Bank Account:</strong>
            <span>{profileData?.bankAccount}</span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Change Profile Photo</h2>
            <img
              src={profileData?.image || "https://via.placeholder.com/100"}
              alt="Current profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4 mx-auto"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
