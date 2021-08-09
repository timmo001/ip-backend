const { copyFileSync, existsSync, mkdirSync } = require("fs");
const { exec } = require("pkg");
const { join } = require("path");

const filePaths = [
  {
    from: "../LICENSE",
    to: "../out/LICENSE",
  },
  {
    from: "../package.json",
    to: "../out/package.json",
  },
];

async function package() {
  await exec([
    join(__dirname, "../"),
    "--output",
    join(
      __dirname,
      `../out/ip${process.platform === "win32" ? ".exe" : ""}`
    ),
  ]);

  await exec([
    join(__dirname, "../tray"),
    "--output",
    join(
      __dirname,
      `../out/ip-tray${process.platform === "win32" ? ".exe" : ""}`
    ),
  ]);

  filePaths
    .filter((path) =>
      path.platform ? path.platform === process.platform : true
    )
    .forEach((path) => {
      const sourceFile = join(__dirname, path.from);
      if (existsSync(sourceFile)) {
        const targetDir = join(
          __dirname,
          path.to.substring(0, path.to.lastIndexOf("/"))
        );
        if (!existsSync(targetDir)) mkdirSync(targetDir);
        const targetFile = join(__dirname, path.to);
        console.log(`Copy ${sourceFile} to ${targetFile}`);
        copyFileSync(sourceFile, targetFile);
      }
    });
}

package();
