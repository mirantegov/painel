"use client";

/**
 * Painel estilo TV: licitações em aberto em carrossel automático,
 * área ~80vh × 90vw; clique entra em tela cheia; ESC sai. Tecla P pausa/retoma.
 */

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LICITACOES_PAINEL } from "@/lib/demo-licitacoes-painel";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 12_000;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function requestFullscreenEl(el: HTMLElement) {
  const w = el as HTMLElement & {
    webkitRequestFullscreen?: () => void;
  };
  if (el.requestFullscreen) {
    return el.requestFullscreen();
  }
  if (w.webkitRequestFullscreen) {
    w.webkitRequestFullscreen();
    return Promise.resolve();
  }
  return Promise.reject(new Error("fullscreen unavailable"));
}

function exitFullscreenDoc() {
  const d = document as Document & {
    webkitExitFullscreen?: () => void;
  };
  if (document.fullscreenElement && document.exitFullscreen) {
    return document.exitFullscreen();
  }
  if (d.webkitExitFullscreen) {
    d.webkitExitFullscreen();
  }
  return Promise.resolve();
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function LicitacoesPainel() {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [fsHint, setFsHint] = React.useState<string | null>(null);

  const slides = LICITACOES_PAINEL;
  const total = slides.length;

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || paused) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api, paused]);

  React.useEffect(() => {
    if (paused) return;

    setProgress(0);
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min(
        100,
        ((now - start) / AUTOPLAY_MS) * 100,
      );
      setProgress(p);
      if (p < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [current, paused]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.fullscreenElement) {
        void exitFullscreenDoc();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "p" && e.key !== "P") return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePanelClick = () => {
    const el = panelRef.current;
    if (!el) return;
    if (document.fullscreenElement) return;
    setFsHint(null);
    void requestFullscreenEl(el).catch(() => {
      setFsHint(
        "Tela cheia indisponível neste navegador ou permissão negada.",
      );
    });
  };

  const secondsLeft = Math.ceil(
    ((100 - progress) / 100) * (AUTOPLAY_MS / 1000),
  );

  return (
    <div className="flex w-full flex-col gap-4">

      <div
        ref={panelRef}
        role="button"
        tabIndex={0}
        onClick={handlePanelClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePanelClick();
          }
        }}
        className={cn(
          "relative mx-auto flex w-[90vw] max-w-[90vw] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-lg ring-1 ring-foreground/5 outline-none transition-shadow",
          "h-[80vh] min-h-[320px] cursor-pointer hover:ring-2 hover:ring-primary/25 focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label="Painel de licitações em aberto. Tecla P pausa ou retoma a rotação. Clique para tela cheia."
      >
        <div className="absolute left-0 right-0 top-0 z-10 h-1.5 bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="flex h-full min-h-0 flex-1 flex-col"
        >
          <CarouselContent className="-ml-0 h-full [&>div]:h-full">
            {slides.map((lic) => (
              <CarouselItem key={lic.id} className="h-full pl-0">
                <div className="flex h-full items-stretch px-6 pb-8 pt-10 sm:px-10">
                  <Card className="flex w-full flex-col justify-center border-0 bg-transparent shadow-none">
                    <CardHeader className="gap-3 space-y-4 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-base">
                          Em aberto
                        </Badge>
                        <span className="font-mono text-xl text-muted-foreground sm:text-2xl">
                          {lic.processo}
                        </span>
                      </div>
                      <CardTitle className="text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        {lic.objeto}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground sm:text-xl">
                        {lic.orgao}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 pt-2 sm:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Modalidade
                        </p>
                        <p className="text-2xl font-semibold sm:text-3xl">
                          {lic.modalidade}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Valor estimado
                        </p>
                        <p className="text-2xl font-semibold tabular-nums sm:text-3xl">
                          {brl.format(lic.valorEstimado)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Abertura do processo
                        </p>
                        <p className="text-xl sm:text-2xl">{lic.dataAbertura}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Limite para propostas
                        </p>
                        <p className="text-xl font-medium text-amber-700 dark:text-amber-400 sm:text-2xl">
                          {lic.dataLimitePropostas}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                          Publicação / portal
                        </p>
                        <p className="mt-1 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                          {lic.portal}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center px-4">
          <p className="max-w-[95%] rounded-full bg-background/90 px-4 py-1.5 text-center text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
            {paused ? (
              <>
                Pausado · slide {current + 1} de {total} · tecla{" "}
                <span className="font-medium text-foreground">P</span> para
                retomar
              </>
            ) : (
              <>
                Slide {current + 1} de {total} · próximo em {secondsLeft}s ·{" "}
                <span className="font-medium text-foreground">P</span> pausa
              </>
            )}
          </p>
        </div>
      </div>

      {fsHint ? (
        <p className="text-center text-base text-amber-700 dark:text-amber-400">
          {fsHint}
        </p>
      ) : null}
    </div>
  );
}
