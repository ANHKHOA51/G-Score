export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-outline-variant bg-surface-container-lowest py-6 px-container-padding flex justify-between items-center transition-opacity duration-200">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">G-Scores</h3>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1">
          © 2024 G-Scores Educational Data Systems. All rights reserved.
        </p>
      </div>
      <div className="flex gap-6">
        <a className="text-on-surface-variant font-label-md text-label-md hover:underline hover:text-primary transition-colors" href="#">Điều khoản</a>
        <a className="text-on-surface-variant font-label-md text-label-md hover:underline hover:text-primary transition-colors" href="#">Bảo mật</a>
        <a className="text-on-surface-variant font-label-md text-label-md hover:underline hover:text-primary transition-colors" href="#">Liên hệ</a>
      </div>
    </footer>
  );
}
