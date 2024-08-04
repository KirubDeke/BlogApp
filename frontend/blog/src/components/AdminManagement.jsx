import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/AdminManagement.css';
import { useNavigate } from 'react-router-dom';
const AdminManagement =()=>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    useEffect(()=>{
        fetchUsers();
    }, [])

    const fetchUsers = async () =>{
        try{
            const response = await fetch(`http://localhost:7700/api/usersList/`);
            const data = await response.json();
            setUsers(data);
            console.log('success');
        }catch(error){
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        setIsDeleting(true);
        setUserToDelete(userId);

        // Show confirm dialog
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            try {
                await fetch(`http://localhost:7700/api/deleteUser/${userId}`, {
                method: 'DELETE',
                });
                setUsers(users.filter((user) => user._id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user. Please try again later.');
            }
        }

        setIsDeleting(false);
        setUserToDelete(null);
    };
    const updateUserRole = async (userId, newRole) => {
      try {
        // Show confirm dialog
        const confirmed = window.confirm(`Are you sure you want to update the user's role to ${newRole}?`);
        if (!confirmed) {
          return;
        }
    
        const response = await fetch(`http://localhost:7700/api/updateUserRole/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: newRole }),
        });
    
        if (response.ok) {
          // Update the user's role in the local state
          setUsers(
            users.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
          );
        } else {
          console.error('Error updating user role:', response.status);
          alert('Error updating user role. Please try again later.');
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Error updating user role. Please try again later.');
      }
    };
    const handleBack = () => {
      navigate(-1);
    };
    const handleLogout = () => {
      navigate('/LoginPage'); 
    }
    
    return(
        <div className='admin-management'>
        <h1>Admin Management</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                   <select
                value={user.role}
                onChange={(e) => updateUserRole(user._id, e.target.value)}
                   >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="author">Author</option>
            </select>
            </td>
                <td>
                  <FontAwesomeIcon
                  icon={faTrash}
                  className='delete-icon'
                  onClick={()=>{deleteUser(user._id)}}
                  style={{cursor:'pointer'}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='button-group'>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
      </div>
    );
}
export default AdminManagement;