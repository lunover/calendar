import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { saveCookie } from "@/app/actions";

export default function LanguageSwitcher({language}: {language: string}) {
  const setLanguage = (value: string) => {
    saveCookie('language', value);
  };

  return (
    <div className="flex items-center space-x-2">
          <Tabs value={language} onValueChange={setLanguage}>
            <TabsList className="rounded-none">
              <TabsTrigger value="en" className="rounded-none">
                English
              </TabsTrigger>
              <TabsTrigger value="np" className="rounded-none">
                नेपाली
        </TabsTrigger>
      </TabsList>
    </Tabs>
    </div>
  );
}
