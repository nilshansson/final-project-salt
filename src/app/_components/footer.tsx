"use client"

export function Footer() {
  return (
    <>
      <div className="py-14"></div>
      <footer className="footer bg-saltDarkBlue rounded p-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="//salt.dev/new-site/wp-content/uploads/2024/02/salt-logo-light.svg"
              alt="SALT Logo"
              className="w-32"
            />
          </div>

          {/* Column 2: Social Media */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/channel/UCTzb3iKuHDbgFuKVN1wPPpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/schoolofappliedtechnology"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Navigation Links
          <nav className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>

          {/* Column 4: Copyright */}
          <aside className="flex items-center justify-center md:justify-end">
            <p>
              Copyright © SALT {new Date().getFullYear()} - All rights reserved
            </p>
          </aside>
        </div>
      </footer>
    </>
  );
}
