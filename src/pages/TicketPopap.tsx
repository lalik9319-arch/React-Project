import { Dialog, DialogContent, DialogTitle, CircularProgress, Box, Stack, FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { Ticket } from "../models/Ticket";
import { get_ticket_by_id, put_comment_by_ticket_id } from "../api/Tickets";
import { useAuth } from "../contexts/auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import TicketDetails from "./TicketDetails";
import { add_comment_by_ticket_id } from "../api/Comments";
import { useTickets } from "../contexts/auth/tikets";
import { get_users } from "../api/Users";
import type { User } from "../models/User";
import { errorAlert, handleApiError } from "../utils/alert";
import NotFound from "./NotFound";
import EmptyState from "../components/emptyState";
import CloseIcon from '@mui/icons-material/Close';

const TicketDetailsDialog = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(false);
    const { token, user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const effectiveTicketId = id ? parseInt(id, 10) : null;
    const effectiveOpen = Boolean(id);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    const { statuses } = useTickets();
    const [users, setUsers] = useState<User[] | null>([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchFullData = async () => {
        if (!effectiveTicketId || !token) return;
        setLoading(true);
        try {
            const data = await get_ticket_by_id(token, effectiveTicketId);
            setTicket(data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setIsNotFound(true);
            } else {
                handleApiError(err, "Failed to load ticket details. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            if (token && user?.role === 'admin') {
                try {
                    const data = await get_users(token);
                    setUsers(data.filter((u: User) => u.role === 'agent'));
                } catch (err) {
                    console.error("Failed to load users", err);
                }
            }
        };
        if (effectiveOpen && effectiveTicketId) {
            fetchFullData();
            loadUsers();
        }
    }, [token, effectiveOpen, effectiveTicketId]);

    const handleClose = () => {
        if (id) {
            navigate("/tickets");
        }
    };

    const handleAssignAgent = async (event: any) => {
        if (!ticket) return;
        const agentId = parseInt(event.target.value, 10);
        setActionLoading(true);
        try {
            await put_comment_by_ticket_id(token!, ticket.id, { assigned_to: agentId, status_id: ticket.status_id, priority_id: ticket.priority_id });
            fetchFullData();
        } catch {
            errorAlert("Failed to assign agent");
        } finally {
            setActionLoading(false);
        }
    };

    const handleChangeStatus = async (event: any) => {
        if (!ticket) return;
        const statusId = parseInt(event.target.value, 10);
        setActionLoading(true);
        try {
            await put_comment_by_ticket_id(token!, ticket.id, { status_id: statusId, priority_id: ticket.priority_id, assigned_to: ticket.assigned_to || 0 });
            fetchFullData();
        } catch {
            errorAlert("Failed to change status");
        } finally {
            setActionLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!ticket) return;
        setActionLoading(true);
        try {
            await add_comment_by_ticket_id(token!, ticket.id, commentText);
            setCommentText("");
            setIsAddingComment(false);
            await fetchFullData();
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Dialog open={effectiveOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Ticket Details {effectiveTicketId ? `#${effectiveTicketId}` : ""}
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
                ) : isNotFound ? (
                    <NotFound />
                ) : ticket ? (
                    <Stack spacing={3}>
                        <TicketDetails ticket={ticket} />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {user?.role === 'admin' && (
                                <FormControl fullWidth disabled={actionLoading}>
                                    <InputLabel>Assign Agent</InputLabel>
                                    <Select value={ticket.assigned_to || ''} label="Assign Agent" onChange={handleAssignAgent}>
                                        <MenuItem value="" disabled><em>Choose Agent</em></MenuItem>
                                        {users?.map((u) => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            )}
                            {(user?.role === 'admin' || user?.role === 'agent') && (
                                <FormControl fullWidth disabled={actionLoading}>
                                    <InputLabel>Change Status</InputLabel>
                                    <Select value={ticket.status_id} label="Change Status" onChange={handleChangeStatus}>
                                        {statuses.map((status) => (
                                            <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>

                        <Button variant="outlined" onClick={() => setIsAddingComment(!isAddingComment)} sx={{ alignSelf: 'flex-start' }}>
                            {isAddingComment ? "Cancel" : "Add Comment"}
                        </Button>

                        {isAddingComment && (
                            <Stack spacing={2}>
                                <TextField
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write your comment here..."
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    disabled={actionLoading || !commentText.trim()}
                                    onClick={handleAddComment}
                                    sx={{ alignSelf: 'flex-end' }}
                                >
                                    {actionLoading ? <CircularProgress size={20} /> : "Submit Comment"}
                                </Button>
                            </Stack>
                        )}

                        <Typography variant="h6">Comments</Typography>
                        <Stack spacing={1.5}>
                            {ticket.comments && ticket.comments.length > 0 ? (
                                ticket.comments.map((comment) => (
                                    <Paper key={comment.id} variant="outlined" sx={{ p: 2 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="subtitle2">{comment.author_name}:</Typography>
                                            <Typography variant="body2">{comment.content}</Typography>
                                        </Stack>
                                    </Paper>
                                ))
                            ) : (
                                <EmptyState message="No comments yet. Be the first to respond!" />
                            )}
                        </Stack>
                    </Stack>
                ) : (
                    <EmptyState message="The ticket data could not be found." buttonText="Back to Tickets" navigateTo="/tickets" />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TicketDetailsDialog;