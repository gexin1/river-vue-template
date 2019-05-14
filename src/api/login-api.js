import request from '@/utils/request';

const login = () => request.post('/login');

export { login };
