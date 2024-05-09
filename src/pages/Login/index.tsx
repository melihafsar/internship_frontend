import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Github, Linkedin, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useLoginForm } from "@/schemas/login-form.schema";
import { useNavigate } from "react-router-dom";
import UserService from "@/services/user.service";
import { cn } from "@/lib/utils";
import { useUtil } from "@/context/UtilContext";

const LoginForm = ({
  form,
  handleLogin,
  currentTabTitle,
  loading,
}: {
  form: any;
  handleLogin: () => void;
  currentTabTitle: string;
  loading: boolean;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CardContent className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button className={cn("flex-1")} disabled={loading} type="submit">
            {loading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Lütfen bekleyin..." : currentTabTitle}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export const Login = () => {
  const [currentTab, setCurrentTab] = useState("login");
  const { form } = useLoginForm();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { supabase, session } = useAuth();
  const { loading, setLoading } = useUtil();
  const [currentUser, setCurrentUser] = useState("Intern");

  const defaultToastError = (error: any) => {
    toast({
      title: "Hata",
      description: error.message || error.msg || "Bir hata oluştu.",
      variant: "destructive",
    });
  };

  // const validateSession = async () => {
  //   if (await session) {
  //     navigate("/");
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   validateSession();
  // }, [session]);

  useEffect(() => {
    form.reset();
  }, [currentTab]);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.getValues("email"),
      password: form.getValues("password"),
    });

    if (error) {
      defaultToastError(error);
      setLoading(false);
      return;
    }
    navigate(`/user-registered?userType=${currentUser}`);
  };

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.getValues("email"),
      password: form.getValues("password"),
    });
    setLoading(false);
    if (error) {
      defaultToastError(error);
      return;
    }
    navigate(`/user-registered?userType=${currentUser}`);
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/user-registered?userType=${currentUser}`,
      },
    });
    setLoading(false);
    if (error) {
      defaultToastError(error);
      return;
    }
    toast({
      title: "Başarılı",
      description: "Giriş başarılı",
      variant: "success",
    });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/user-registered?userType=${currentUser}`,
      },
    });
    setLoading(false);
    if (error) defaultToastError(error);
  };

  const handleLinkedinLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
      options: {
        redirectTo: `${window.location.origin}/user-registered?userType=${currentUser}`,
      },
    });
    setLoading(false);
    if (error) defaultToastError(error);
  };

  return (
    <>
      <Tabs
        defaultValue="Intern"
        value={currentUser}
        className="w-[300px] md:w-[400px] lg:w-[500px] mb-2"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Intern" onClick={() => setCurrentUser("Intern")}>
            Stajyer
          </TabsTrigger>
          <TabsTrigger
            value="CompanyOwner"
            onClick={() => setCurrentUser("CompanyOwner")}
          >
            Şirket Sahibi
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs
        defaultValue="login"
        value={currentTab}
        className="w-[300px] md:w-[400px] lg:w-[500px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setCurrentTab("login")}>
            Giriş Yap
          </TabsTrigger>
          <TabsTrigger
            value="register"
            onClick={() => setCurrentTab("register")}
          >
            Kayıt Ol
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Giriş Yap</CardTitle>
              <CardDescription className="mt-2">
                Daha önce hesabınızı oluşturduysanız, buradan giriş
                yapabilirsiniz.
              </CardDescription>
              <div className="p-2 grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={handleGithubLogin}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1"
                  >
                    <Github size={14} />
                    Github
                  </button>
                  <button
                    onClick={handleGoogleLogin}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="mr-2 h-3 w-3"
                    >
                      <path
                        fill="currentColor"
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      ></path>
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={handleLinkedinLogin}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1"
                  >
                    <Linkedin size={14} />
                    Linkedin
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      veya
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <LoginForm
              form={form}
              handleLogin={handleLogin}
              currentTabTitle="Giriş Yap"
              loading={loading}
            />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Kayıt Ol</CardTitle>
              <CardDescription>
                Daha önce hesabınızı oluşturmadıysanız, buradan kayıt
                olabilirsiniz.
              </CardDescription>
            </CardHeader>
            <LoginForm
              form={form}
              handleLogin={handleRegister}
              currentTabTitle="Kayıt Ol"
              loading={loading}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Login;
