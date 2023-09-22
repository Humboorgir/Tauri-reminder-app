// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command] 
fn play() {
use std::fs::File;
use std::io::BufReader;
use std::thread;
use rodio::{Decoder, OutputStream, source::Source};

thread::spawn(|| {
let (_stream, stream_handle) = OutputStream::try_default().unwrap();
let file = BufReader::new(File::open("assets/alarm.mp3").unwrap());
let source = Decoder::new(file).unwrap();
stream_handle.play_raw(source.convert_samples());
thread::sleep(std::time::Duration::from_secs(30));
});
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![play])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
