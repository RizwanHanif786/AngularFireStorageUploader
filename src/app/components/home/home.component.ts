import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FileUpload } from "src/app/models/file.upload.model";
import { FileUploadService } from "src/app/services/file-upload.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  uploadMeme = this.fb.group({
    meme_name: ["", Validators.required],
    image_url: ["", Validators.required],
    image_filename: "",
    audio_filename: "",
    audio_url: ["", Validators.required],
  });
  preview: any[] = [];
  constructor(
    private fb: FormBuilder,
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.uploadService.getMemes().subscribe((data) => {
      console.log(data);
      this.preview = data;
    }),
      (error) => {
        console.log(error);
      };
  }

  get f() {
    return this.uploadMeme.controls;
  }

  uploadImage(event: any): void {
    const file = new FileUpload(event.target.files[0]);
    if (file.file) {
      this.uploadService.uploadFile(file).then(
        (url) => {
          console.log("url: ", url);
          this.uploadMeme.patchValue({
            image_url: url,
            image_filename: file.file.name,
          });

          this.toastr.success("Image uploaded successfully");
        },
        (error) => {
          this.toastr.error("Error uploading image");
        }
      );
    }
  }

  uploadAudio(event: any): void {
    const file = new FileUpload(event.target.files[0]);
    this.uploadService.uploadFile(file).then(
      (url) => {
        console.log("url: ", url);
        this.uploadMeme.patchValue({
          audio_url: url,
          audio_filename: file.file.name,
        });
        this.toastr.success("Audio uploaded successfully");
      },
      (error) => {
        this.toastr.error("Error uploading audio");
      }
    );
  }

  upload() {
    console.log(this.uploadMeme.value);
    this.uploadService.saveToDatabase(this.uploadMeme.value)
  }
}
