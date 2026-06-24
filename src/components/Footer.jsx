import React from 'react'

const Footer= () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="lg:text-base text-sm text-gray-500 dark:text-gray-300">
              © 2026 Finance Dashboard. All rights reserved.
            </div>
            <div className="flex gap-4 lg:text-base text-sm  text-gray-500 dark:text-gray-300">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
            </div>
          </div>
  )
}

export default Footer
