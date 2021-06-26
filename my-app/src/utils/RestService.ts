import { FCompany, Photo, User, Workspace } from "./Rest";

import { API } from "./api";
import workspaces from './../assets/workspaces.json'

class RestService {
    async getUserPhoto(id: number): Promise<Photo> {
        return fetch(`${API}/photos/${id}`)
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    async getUserProfile(id?: number): Promise<User> {
        const user: User = await fetch(`${API}/users/${id}`)
        .then(response => response.json());
        const photo = await this.getUserPhoto(user.id)
        user.photo = photo;

        return user;
    }

    async getCompanies(): Promise<Array<FCompany>> {
        let users: User[] = await fetch(`${API}/users`)
        .then(response => response.json())
        .catch(error => console.log(error));
        users = [...users, ...users, ...users];
        let address = Promise.all(users.map(async (user, i) => {
            const newAddress: FCompany = {
                id: i,
                address: `${user.address.street} ${user.address.suite}, ${user.address.city}`,
                name: user.company.name
            }

            newAddress.photo = await this.getUserPhoto(user.id)
            .then(response => response)
            .catch(error => console.log(error));

            return newAddress;
        }));

        return address;
    }

    getWorkspace(id: number): Workspace | undefined {
        return workspaces.find((v) => v.id === id);
    }

    getWorkspaces(): Workspace[] {
        return workspaces;
    }
}


export default RestService;