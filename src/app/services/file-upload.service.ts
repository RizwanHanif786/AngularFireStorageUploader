import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
} from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../models/file.upload.model";
import { DataService } from "./data.service";
@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  private basePath = "/uploads";
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  uploadFile(fileUpload: FileUpload): Promise<any> {
    return new Promise((resolve, reject) => {
      const filePath = `${this.basePath}/${fileUpload.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload.file);
      uploadTask.then(() => {
        const url = storageRef.getDownloadURL().toPromise();
        resolve(url);
      });
    });
  }

  saveToDatabase(memePayload: any) {
    this.db
      .collection("memes")
      .add(memePayload)
      .then(() => {
        this.toastr.success("Meme uploaded successfully");
      })
      .catch((error) => {
        this.toastr.error("Error uploading meme", JSON.stringify(error));
      });
  }

  getMemes(): Observable<any> {
    return this.db.collection("memes").valueChanges();
  }

}
