import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Caricamento...</p>
      </div>
    </div>
  );
};

export default LoadingPage;