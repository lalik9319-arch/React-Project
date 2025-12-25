import { useEffect, useState } from 'react';
import { get_users } from '../api/Users';
import { useAuth } from '../contexts/auth/auth';
import type { Createser } from '../models/User';
import { handleApiError } from '../utils/alert';
import Loading from '../components/Loading';
import EmptyState from '../components/emptyState';

import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Stack } from '@mui/material';

const AllUsers = () => {
    const [users, setUsers] = useState<Createser[]>([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (token) {
                    const data = await get_users(token);
                    setUsers(data);
                }
            } catch (err: any) {
                handleApiError(err, "Failed to load users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1">All Users</Typography>
                <Button variant="contained" onClick={() => navigate('/addUser')}>Add New User</Button>
            </Stack>
            {users.length === 0 ? (
                <EmptyState message="No users found." navigateTo="/addUser" buttonText="Add User" />
            ) : (
                <TableContainer component={Paper} variant="outlined">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
};

export default AllUsers;