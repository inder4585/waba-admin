'use client';

import { Brain, Zap, Sparkles, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { videostoriLogo } from '@/utils/image-constent';

const AuthBg = () => {
  return (
    <div className="basis-1/2 w-full relative hidden xl:flex justify-center items-center bg-gradient-neural bg-400% animate-gradient-shift">
      <img
        src={'/bgadmin.png'}
        alt="AI Neural Network"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
      <div className="absolute top-20 left-20 w-4 h-4 bg-ai-accent rounded-full animate-neural-pulse"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-ai-secondary rounded-full animate-neural-pulse delay-75"></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-primary-glow rounded-full animate-neural-pulse delay-150"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-ai-neural rounded-full animate-neural-pulse delay-300"></div>

      <div className="relative z-10 backdrop-blur-xl bg-background/10 border border-border/20 p-14 2xl:p-20 rounded-2xl max-w-[640px] shadow-ai">
        <div className="space-y-8">
          <Button className="bg-transparent hover:scale-105 hover:bg-transparent transition-all duration-300  p-4 rounded-full shadow-glow animate-ai-glow">
            <img
              src={videostoriLogo}
              alt="Model Icon"
              className="size-8 md:size-16"
            />
          </Button>

          <div className="space-y-4">
            <div className="text-4xl leading-tight 2xl:text-6xl 2xl:leading-tight font-bold">
              <span className="text-foreground/90">
                Unlock the <br />
              </span>
              <span className="bg-gradient-ai bg-clip-text ">Power of AI</span>
              <br />
              <span className="text-foreground">Intelligence</span>
            </div>

            <p className="text-xl 2xl:text-2xl font-medium text-foreground/80">
              Transform your workflow with cutting-edge <br />
              artificial intelligence technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/20 backdrop-blur border border-border/20">
              <div className="p-2 rounded-lg bg-ai-primary/20">
                <Brain className="h-5 w-5 text-ai-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Smart Analytics
                </div>
                <div className="text-sm text-foreground/70">
                  AI-powered insights
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/20 backdrop-blur border border-border/20">
              <div className="p-2 rounded-lg bg-ai-accent/20">
                <Zap className="h-5 w-5 text-ai-accent" />
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Lightning Fast
                </div>
                <div className="text-sm text-foreground/70">
                  Instant processing
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/20 backdrop-blur border border-border/20">
              <div className="p-2 rounded-lg bg-ai-secondary/20">
                <Sparkles className="h-5 w-5 text-ai-secondary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Automated</div>
                <div className="text-sm text-foreground/70">
                  Effortless workflow
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/20 backdrop-blur border border-border/20">
              <div className="p-2 rounded-lg bg-ai-neural/20">
                <TrendingUp className="h-5 w-5 text-ai-neural" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Growth</div>
                <div className="text-sm text-foreground/70">
                  Scale with confidence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBg;
