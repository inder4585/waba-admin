import { useSession } from 'next-auth/react';
import * as React from 'react';

export function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session?.user?.id) {
      setMounted(true);
    }
  }, [session]);

  return mounted;
}
