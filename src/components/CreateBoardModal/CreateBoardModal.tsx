// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icon
import CloseIcon from '@mui/icons-material/Close';

// Form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// RTK
import {
    useCreateBoardMutation,
    Board,
} from '../../features/myBoards/myBoardsApi';

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean;
    handleClose: () => void;
}
interface CreateBoard {
    name: string;
}

const createBoardSchema = yup.object().shape({
    name: yup.string().required('Please give board a name.'),
});

export default function CreateBoardModal({ open, handleClose }: Props) {
    const { handleSubmit, control } = useForm<CreateBoard>({
        resolver: yupResolver(createBoardSchema),
    });
    const [createBoard, { isLoading }] = useCreateBoardMutation();
    const handleBoardCreateSubmit = async (data: CreateBoard) => {
        try {
            await createBoard(data).unwrap();
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create Board
                </Typography>
                <IconButton
                    aria-label="close board create modal"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Divider />
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1 },
                    }}
                    onSubmit={handleSubmit(handleBoardCreateSubmit)}
                    noValidate
                    autoComplete="off"
                >
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                autoComplete="board name"
                                variant="outlined"
                                placeholder="Board Name"
                                label="Board Name"
                                error={error && true}
                                helperText={error?.message}
                                autoFocus
                                {...field}
                            ></TextField>
                        )}
                    />
                    <LoadingButton
                        variant="contained"
                        color="secondary"
                        loading={isLoading}
                        type="submit"
                        fullWidth
                    >
                        Create
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    );
}