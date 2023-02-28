const filter = { acceptAllAdvertisements: true };
const options = { keepRepeatedDevices: true, acceptAllAdvertisements: true };

const beaconList = document.getElementById("beacon-list");
const detectDevices = {};
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
          const rssi = event.rssi;
          const name = device.name ? device.name : 'Unknown Device';
          const deviceId = device.id;

          if(Object.keys(detectDevices).indexOf(deviceId) >= 0) {
            const deviceRow = document.getElementById(deviceId);
            deviceRow.children[0].innerHTML = deviceId
            deviceRow.children[1].innerHTML = name
            deviceRow.children[2].innerHTML = `${rssi} dBm`
          } else {
            detectDevices[deviceId]=rssi
            beaconList.innerHTML += `
                <p id="${deviceId}">
                  <span>${deviceId}</span>
                  <span>${name}</span>
                  <span>${rssi} dBm</span>
                </p>`;
          }
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