import { Container, Stack } from '@mui/material';
import CreateUserForm from '../components/CreateUserForm';

export const Register = () => (
    <Stack direction="row" sx={{height: '100vh', justifyContent: "center", alignItems: "center", mt:-6}}>
        <Container maxWidth="md" sx={{ py: 3 }}>
            <CreateUserForm />
        </Container>
    </Stack>
);