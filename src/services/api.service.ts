import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, PASSPHRASE_AUTH } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private url: string;
    private header: HttpHeaders | undefined;
    private key: string | undefined;

    constructor(
        private _http: HttpClient,
        private utils: UtilsService,
    ) {
        this.url = environment.url;
    }

    public async get(endpoint: string, data: any = {}): Promise<ApiResponse> {

        await this.atualizarHeader();

        const promise: any = new Promise(async (resolve: any) => {

            let url = this.url + endpoint + '/';

            if (data['id'] ?? '' != '') {
                url += data['id'];
            }

            try {

                this._http.get(url, {
                    // params: data,
                    // headers: this.header
                }).subscribe(async (res: any) => {

                    if (res.responseCode === 401) {
                        await this.logout();
                    }

                    try {

                        resolve(res);

                    } catch (error) {
                        console.log(error);
                        await this.logout();
                        resolve({ status: 'error' });
                    }

                }, async (res: HttpErrorResponse) => {

                    if (res.status === 401) {
                        await this.logout();
                    }

                    resolve(res.error);

                });

            } catch (error) {
                this.utils.exibirToast('erro', 'Ocorreu um erro, tente novamente!', 'Erro');
                resolve({ status: 'error' });
            }

        });

        return promise;

    }

    public async post(endpoint: string, data: any = {}): Promise<ApiResponse> {

        await this.atualizarHeader();

        const promise: any = new Promise(async (resolve: any) => {

            try {

                this._http.post(this.url + endpoint, data, {
                    // headers: this.header
                })
                    .subscribe(async (res: any) => {

                        if (res.responseCode === 401) {
                            await this.logout();
                        }

                        try {

                            resolve(res);

                        } catch (error) {

                            await this.logout();
                            resolve({ status: 'error' });
                        }

                    }, async (res: HttpErrorResponse) => {

                        if (res.status === 401) {
                            await this.logout();
                        }

                        resolve(res.error);

                    });

            } catch (error) {
                console.log(error);
                this.utils.exibirToast('erro', 'Ocorreu um erro, tente novamente!', 'Erro');
                resolve({ status: 'error' });
            }

        });

        return promise;

    }

    public async put(endpoint: string, data: any = {}): Promise<ApiResponse> {

        await this.atualizarHeader();

        const promise: any = new Promise(async (resolve: any) => {

            let url = this.url + endpoint + '/';
            const id = this.utils.getStorage('cms_conteudo_id');

            if (id ?? '' != '') {
                url += id;
            }

            try {

                this._http.put(url, data, {
                    // headers: this.header
                })
                    .subscribe(async (res: any) => {

                        if (res.responseCode === 401) {
                            await this.logout();
                        }

                        try {

                            resolve(res);

                        } catch (error) {
                            console.log(error);
                            await this.logout();
                            resolve({ status: 'error' });
                        }

                    }, async (res: HttpErrorResponse) => {

                        if (res.status === 401) {
                            await this.logout();
                        }

                        resolve(res.error);

                    });

            } catch (error) {

                this.utils.exibirToast('erro', 'Ocorreu um erro, tente novamente!', 'Erro');
                resolve({ status: 'error' });

            }

        });

        return promise;

    }

    // public async delete(endpoint: string, data: any = {}): Promise<ApiResponse> {

    //     const encrypt = await this.utils.getStorage('encrypt') ?? 0;

    //     let key: string;

    //     if (encrypt === 1) {

    //         if (this.key === undefined || this.key === null) {
    //             this.key = await this.getToken();
    //         }

    //         key = AES256.decrypt(this.key, PASSPHRASE_AUTH);

    //     }

    //     if (encrypt === 1) {
    //         key = AES256.decrypt(this.key, PASSPHRASE_AUTH);
    //     }

    //     await this.atualizarHeader();

    //     const promise: any = new Promise(async (resolve: any) => {

    //         try {

    //             if (data != '' || data != null) {

    //                 if (encrypt === 1) {
    //                     data = {
    //                         data: AES256.encrypt(JSON.stringify(data), key)
    //                     };
    //                 }

    //             }


    //             this._http.delete(this.url + endpoint + '/', {
    //                 params: data,
    //                 // headers: this.header
    //             }).subscribe(async (res: ApiResponse) => {

    //                 await this.utils.ocultarLoading();

    //                 if (res.responseCode === 401) {
    //                     await this.logout();
    //                 }

    //                 try {

    //                     if (res.data !== undefined && encrypt === 1) {
    //                         res.data = JSON.parse(AES256.decrypt(res.data, key));
    //                     }

    //                     resolve(res);

    //                 } catch (error) {
    //                     console.log(error);
    //                     await this.logout();
    //                     resolve({ status: 'error' });
    //                 }

    //             }, async (res: HttpErrorResponse) => {

    //                 await this.utils.ocultarLoading();

    //                 if (res.status === 401) {
    //                     await this.logout();
    //                 }

    //                 if (res.error.data !== undefined && encrypt === 1) {
    //                     res.error.data = JSON.parse(AES256.decrypt(res.error.data, key));
    //                 }

    //                 resolve(res.error);

    //             });

    //         } catch (error) {
    //             console.log(error);
    //             await this.utils.ocultarLoading();
    //             this.utils.exibirToast('Ocorreu um erro, tente novamente!', 'erro');
    //             resolve({ status: 'error' });
    //         }

    //     });

    //     return promise;

    // }

    private async atualizarHeader() {

        const usuario = await this.utils.getStorage('usuario');
        const encrypt = await this.utils.getStorage('encrypt') ?? 0;

        const aaa = encrypt === 1 ? 'true' : 'false';

        if (usuario != null) {

            this.header = new HttpHeaders({
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + usuario.jwt,
                // Encrypt: encrypt === 1 ? 'true' : 'false',
            });

        } else {

            this.header = new HttpHeaders({
                'Content-Type': 'application/json',
                // Encrypt: encrypt === 1 ? 'true' : 'false',
            });

        }

    }

    private logout() {

        this.utils.removeStorage('usuario');
        this.utils.navegar('restrito');
        this.utils.exibirToast('warning', 'Faça login novamente para renovar sua sessão.', 'Sessão expirada')

    }

}
