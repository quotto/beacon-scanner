const filter = { acceptAllAdvertisements: true };
const options = { keepRepeatedDevices: false, acceptAllAdvertisements: true };

const beaconList = document.getElementById("beacon-list");
// Bluetoothのスキャンを開始する関数
async function startScan() {
  try {
    // ユーザーの許可を取得するために、ユーザージェスチャーを待つ
    navigator.bluetooth.requestLEScan(options)
      .then((scanner) => {
        navigator.bluetooth.addEventListener("advertisementreceived", event => {
          console.log(JSON.stringify(event));
          const device = event.device;
          // 検出されたデバイスの情報を表示する
          beaconList.innerHTML = '';
          const rssi = device.adData.rssi;
          const name = device.name ? device.name : 'Unknown Device';
          const deviceId = device.id;
          beaconList.innerHTML += `
              <tr>
                <td>${deviceId}</td>
                <td>${name}</td>
                <td>${rssi} dBm</td>
              </tr>`;
        })
      }).catch(error => {
        console.error(error);
      })
  } catch (error) {
    console.error(error)
  }
}

// ページが読み込まれたときに実行される関数
function init() {
  // スキャン開始ボタンを取得する
  const startButton = document.getElementById("start-scan");

  // スキャン開始ボタンをクリックしたときにスキャンを開始するようにする
  startButton.addEventListener("click", startScan);
}

// ページが読み込まれたらinit関数を実行する
window.addEventListener("load", init);