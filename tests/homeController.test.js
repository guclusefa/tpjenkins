const { homepage, connect, listUsersWithoutGroup } = require('../controllers/homeController');
const Home = require('../models/home');

jest.mock('../models/home'); // Mock le module Home

describe('Home Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            session: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            render: jest.fn(),
            send: jest.fn(),
            redirect: jest.fn(),
        };
        next = jest.fn();
    });

   
    describe('connect', () => {
        it('should return 400 if pseudo is missing', async () => {
            await connect(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Pseudo requis");
        });

        it('should connect user if pseudo exists', async () => {
            req.body.pseudo = 'existingUser';
            Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, true));

            await connect(req, res);

            expect(Home.checkUsernameExists).toHaveBeenCalledWith('existingUser', expect.any(Function));
            expect(req.session.user).toEqual({ pseudo: 'existingUser' });
            expect(res.redirect).toHaveBeenCalledWith('/users-without-group');
        });

        it('should save pseudo if it does not exist', async () => {
            req.body.pseudo = 'newUser';
            Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, false));
            Home.saveUsername.mockImplementation((pseudo, callback) => callback(null));

            await connect(req, res);

            expect(Home.checkUsernameExists).toHaveBeenCalledWith('newUser', expect.any(Function));
            expect(Home.saveUsername).toHaveBeenCalledWith('newUser', expect.any(Function));
            expect(req.session.user).toEqual({ pseudo: 'newUser' });
            expect(res.redirect).toHaveBeenCalledWith('/users-without-group');
        });

        it('should handle error during username check', async () => {
            req.body.pseudo = 'user';
            Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(new Error('Error')));

            await connect(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Erreur lors de la vérification du pseudo");
        });

        it('should handle error during username save', async () => {
            req.body.pseudo = 'newUser';
            Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, false));
            Home.saveUsername.mockImplementation((pseudo, callback) => callback(new Error('Error')));

            await connect(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Erreur lors de l'enregistrement du pseudo");
        });
    });

    describe('listUsersWithoutGroup', () => {
        it('should render users without group', async () => {
            const users = [{ id: 1, name: 'User 1' }];
            req.session.user = { pseudo: 'testUser' };
            Home.getUsersWithoutGroup.mockImplementation((callback) => callback(null, users));

            await listUsersWithoutGroup(req, res);

            expect(Home.getUsersWithoutGroup).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith('users-without-group', { users, user: req.session.user });
        });

        it('should handle error when getting users without group', async () => {
            const error = new Error('Database error');
            Home.getUsersWithoutGroup.mockImplementation((callback) => callback(error));

            await listUsersWithoutGroup(req, res);

            expect(Home.getUsersWithoutGroup).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Erreur lors de la récupération des utilisateurs sans groupe");
        });
    });
});
