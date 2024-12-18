import React from 'react'

export const Skeleton = () => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <tbody className="divide-y divide-gray-200 bg-white">

          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 animate-pulse">
              <div className='h-4 bg-gray-300 '></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse"><div className='h-4 bg-gray-300 '></div></td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse"><div className='h-4 bg-gray-300 '></div></td>

          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 animate-pulse">
              <div className='h-4 bg-gray-300 '></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse"><div className='h-4 bg-gray-300 '></div></td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse"><div className='h-4 bg-gray-300 '></div></td>

          </tr>

        </tbody>
      </table>
    </div>
  )
}
