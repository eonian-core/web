export function StickyContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="sticky w-full top-1/2 -translate-y-1/2 flex flex-col justify-center items-center">{children}</div>
  )
}
