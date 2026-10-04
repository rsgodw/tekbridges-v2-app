import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

const ARTIFACTS_DIR = "C:\\Users\\rgodw\\.gemini\\antigravity\\brain\\f5c6117d-3a92-420f-a9bc-73b07b6bc329\\scratch";

async function runTest() {
  console.log("Starting Next.js server...");
  const server = spawn('npm', ['run', 'start'], { stdio: 'ignore', shell: true });

  // Wait for server to boot
  await new Promise(r => setTimeout(r, 4000));

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to mobile size
  await page.setViewport({ width: 390, height: 844 });
  
  console.log("Navigating to localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_home.png') });
  
  console.log("Clicking 'Deploy Platform' in Navigation...");
  await page.click('a[href="/blueprint"]');
  
  // Wait for Blueprint page to load
  await page.waitForFunction(() => document.body.innerText.includes('Accounting/CPA'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000)); // wait for fade animation
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_blueprint_stage1.png') });
  
  console.log("Selecting 'Accounting/CPA'...");
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Accounting/CPA')) {
      await btn.click();
      break;
    }
  }

  // Stage 2
  await page.waitForFunction(() => document.body.innerText.includes('Digital Footprint'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.type('input[placeholder="e.g. yourfirm.com"]', 'test-firm.com');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_blueprint_stage2.png') });

  console.log("Submitting Domain Audit...");
  const searchBtns = await page.$$('button');
  for (const btn of searchBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Run Domain Audit')) {
      await btn.click();
      break;
    }
  }

  // Wait for audit sequence to complete (2.5 seconds)
  await new Promise(r => setTimeout(r, 3000));
  
  // Stage 3
  await page.waitForFunction(() => document.body.innerText.includes('Secure Client Portal'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_blueprint_stage3.png') });

  console.log("Selecting 'Secure Client Portal'...");
  const stage3Btns = await page.$$('button');
  for (const btn of stage3Btns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Secure Client Portal')) {
      await btn.click();
      break;
    }
  }

  // Stage 4
  await page.waitForFunction(() => document.body.innerText.includes('RECOMMENDED DEPLOYMENT'), { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_blueprint_stage4.png') });

  console.log("Test completed successfully!");
  
  await browser.close();
  server.kill();
  process.exit(0);
}

runTest().catch(err => {
  console.error(err);
  process.exit(1);
});
