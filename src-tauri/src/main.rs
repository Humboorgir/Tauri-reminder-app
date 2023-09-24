// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
    use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
let tray = SystemTray::new();
let quit = CustomMenuItem::new("quit".to_string(), "Quit");
let hide = CustomMenuItem::new("hide".to_string(), "Hide");
let tray_menu = SystemTrayMenu::new()
  .add_item(quit)
  .add_native_item(SystemTrayMenuItem::Separator)
  .add_item(hide);
let tray = SystemTray::new().with_menu(tray_menu);

tauri::Builder::default()
.system_tray(tray)
.invoke_handler(tauri::generate_handler![play])
.run(tauri::generate_context!())
.expect("error while running tauri application");

}