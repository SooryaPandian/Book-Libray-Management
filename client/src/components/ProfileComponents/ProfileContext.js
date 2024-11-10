// components/ProfileComponents/ProfileContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [updatedUserName, setUpdatedUserName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedGenres, setUpdatedGenres] = useState('');
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false); // Add this line
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            withCredentials: true,
          });
          setUser(response.data);
          setUpdatedUserName(response.data.user_name);
          setUpdatedEmail(response.data.email);
          setUpdatedGenres(response.data.genres.join(', '));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleEditProfile = async () => {
      try {
        const response = await axios.put('http://localhost:5000/api/users/profile', {
          user_name: updatedUserName,
          email: updatedEmail,
          genres: updatedGenres.split(',').map((genre) => genre.trim()),
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
        setEditModalOpen(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/auth');
    };
  
    const handlePasswordUpdate = async () => {
      try {
        const response = await axios.put(
          'http://localhost:5000/api/users/profile/password',
          {
            currentPassword,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            withCredentials: true,
          }
        );
        alert(response.data.message);
        setPasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
      } catch (error) {
        setPasswordError(error.response?.data?.message || "Error updating password");
      }
    };
  
  
    const handleDeleteAccount = async () => {
      try {
        const response = await axios.delete('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        });
        alert(response.data.message);
        localStorage.removeItem('token');
        navigate('/auth');
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("There was an issue deleting your account.");
      } finally {
        setDeleteModalOpen(false); // Close modal
      }
    };
  

  return (
    <ProfileContext.Provider
      value={{
        user,
        isEditModalOpen,
        setEditModalOpen,
        isPasswordModalOpen,
        setPasswordModalOpen,
        isDeleteModalOpen,
        setDeleteModalOpen,
        updatedUserName,
        setUpdatedUserName,
        updatedEmail,
        setUpdatedEmail,
        updatedGenres,
        setUpdatedGenres,
        passwordError,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        handleEditProfile,
        handlePasswordUpdate,
        handleDeleteAccount,
        handleLogout,
      }}
    >
        {console.log("this is user: "+user)}
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
