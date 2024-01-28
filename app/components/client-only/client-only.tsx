import React from 'react'

// TODO: remove it
export function ClientOnly({ children }: React.PropsWithChildren) {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}
