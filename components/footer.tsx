import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-purple text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">درباره موزیکفا</h3>
            <p className="text-gray-300 text-sm">
              موزیکفا یکی از بزرگترین مراجع دانلود موسیقی ایرانی با کیفیت بالا و لینک مستقیم است. تمامی آهنگ‌ها با کیفیت
              320 و 128 کیلوبیت ارائه می‌شوند.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/category/new">آهنگ های جدید</Link>
              </li>
              <li>
                <Link href="/category/special">آهنگ های ویژه</Link>
              </li>
              <li>
                <Link href="/category/happy">آهنگ های شاد</Link>
              </li>
              <li>
                <Link href="/category/remix">ریمیکس</Link>
              </li>
              <li>
                <Link href="/category/madahi">مداحی</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <p className="text-gray-300 text-sm">
              برای ارسال آهنگ و تبلیغات با ما در ارتباط باشید.
              <br />
              شماره تماس: 0938-0410281
              <br />
              ایمیل: info@musicfa.com
            </p>
          </div>
        </div>

        <div className="border-t border-purple/50 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>تمامی حقوق این وب‌سایت متعلق به موزیکفا می‌باشد. &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
