import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<any | null>(null);

	useEffect(() => {
		fetch("/api/get-session")
			.then((data) => data.json())
			.then((data) => {
				setSession(data);
			});
	}, []);

  return {
    session,
  };
};
