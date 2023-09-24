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
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent, Manager, SystemTray};
let quit = CustomMenuItem::new("quit".to_string(), "Quit");
let show = CustomMenuItem::new("show".to_string(), "Show app");

let tray_menu = SystemTrayMenu::new()
  .add_item(quit)
  .add_native_item(SystemTrayMenuItem::Separator)
  .add_item(show);
let tray = SystemTray::new().with_menu(tray_menu);

tauri::Builder::default()
.on_window_event(|event| match event.event() {
  tauri::WindowEvent::CloseRequested { api, .. } => {
    event.window().hide().unwrap();
    api.prevent_close();
  }
  _ => {}
})
.system_tray(tray)
.on_system_tray_event(move |app, event| match event {
  SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
      "quit" => {
          std::process::exit(0);
      }
      "show" => {
          let w = app.get_window("main").unwrap();
          w.show().unwrap();
          w.set_focus().unwrap();
      }
      _ => {}
  },
  _ => {}
})
.invoke_handler(tauri::generate_handler![play])
.run(tauri::generate_context!())
.expect("error while running tauri application");

}