import { Buffer } from "node:buffer";
import { exec } from "node:child_process";
import { unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { cwd } from "node:process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

const GITHUB_REPO_URL =
  "https://api.github.com/repos/pocketbase/pocketbase/releases/latest";

const POCKETBASE_DIR = path.join(cwd(), "pocketbase");

const platform = os.platform();
const arch = os.arch();

// get release info from github
const getReleaseInfo = async () => {
  const response = await fetch(GITHUB_REPO_URL);
  const data = await response.json();
  return data;
};

// download and extract zip file from http url
const downloadAndExtract = async (url) => {
  const zipPath = path.join(POCKETBASE_DIR, "download.zip");
  const response = await fetch(url);
  const zipBuffer = Buffer.from(await response.arrayBuffer());
  await writeFile(zipPath, zipBuffer);

  try {
    if (platform === "win32") {
      // Windows command to unzip
      await execPromise(
        `powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${POCKETBASE_DIR}'"`
      );

      // Remove all files except 'pocketbase' (adjust the path as necessary)
      await execPromise(
        `powershell -command "Get-ChildItem '${POCKETBASE_DIR}' -Exclude pocketbase | Remove-Item -Force"`
      );
    } else {
      // macOS and Linux command to unzip
      await execPromise(
        `unzip -o '${zipPath}' 'pocketbase' -d '${POCKETBASE_DIR}'`
      );
    }

    console.log(
      `Successfully downloaded and extracted PocketBase to ./pocketbase/pocketbase`
    );

    await unlink(zipPath);
  } catch (error) {
    console.error("Failed to extract zip file", error);
    console.log(
      "Please extract the zip file manually and move the 'pocketbase' binary to the 'pocketbase' directory"
    );
  }
};

const main = async () => {
  const data = await getReleaseInfo();

  const asset = data.assets.find(
    (asset) =>
      asset.name.includes(`${platform}_${arch}`) &&
      asset.content_type === "application/zip"
  );

  if (!asset) {
    console.error("No asset found for your platform");
    return;
  }

  const downloadUrl = asset.browser_download_url;
  console.log(`Downloading PocketBase ${data.tag_name} from ${downloadUrl}`);

  await downloadAndExtract(downloadUrl);
};

main();
