"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarBadge } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Copy01Icon, 
  AlertCircleIcon, 
  Delete02Icon, 
  Share03Icon, 
  ShoppingBag01Icon, 
  MoreHorizontalCircle01Icon, 
  Loading03Icon, 
  PlusSignIcon, 
  MinusSignIcon, 
  ArrowLeft02Icon, 
  ArrowRight02Icon, 
  Tick02Icon, 
  ArrowDown01Icon, 
  ArrowRight01Icon, 
  Search01Icon, 
  Settings01Icon, 
  ArrowUp01Icon,
  Mail01Icon,
  Notification02Icon,
  UserIcon,
  StarIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons"

// Funcao para converter oklch para hex
function oklchToHex(oklchStr: string): string {
  // Parse oklch string: oklch(L C H) or oklch(L C H / A)
  const match = oklchStr.match(/oklch\(([^)]+)\)/)
  if (!match) return "#000000"
  
  const parts = match[1].split(/[\s/]+/).map(p => parseFloat(p))
  const [L, C, H] = parts
  
  if (isNaN(L) || isNaN(C)) return "#000000"
  
  // Convert OKLCH to OKLab
  const hRad = ((H || 0) * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  
  // OKLab to linear sRGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  
  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let bVal = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  
  // Linear sRGB to sRGB
  const toSrgb = (c: number) => {
    c = Math.max(0, Math.min(1, c))
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  }
  
  r = Math.round(toSrgb(r) * 255)
  g = Math.round(toSrgb(g) * 255)
  bVal = Math.round(toSrgb(bVal) * 255)
  
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(bVal)}`.toUpperCase()
}

// Funcao para obter valor de CSS variable
function getCssVarValue(varName: string): string {
  if (typeof window === 'undefined') return ''
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value
}

export function Demo() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const [progressValue, setProgressValue] = React.useState(66)
  const [colorHexValues, setColorHexValues] = React.useState<Record<string, string>>({})
  
  const handleSliderValueChange = React.useCallback((value: number[]) => {
    setSliderValue(value)
  }, [])

  // Calcular valores hex das cores
  React.useEffect(() => {
    const colorVars = [
      "--background",
      "--foreground",
      "--primary",
      "--secondary",
      "--muted",
      "--accent",
      "--border",
      "--chart-1",
      "--chart-2",
      "--chart-3",
      "--chart-4",
      "--chart-5",
    ]
    
    const hexValues: Record<string, string> = {}
    colorVars.forEach(varName => {
      const oklchValue = getCssVarValue(varName)
      hexValues[varName] = oklchToHex(oklchValue)
    })
    setColorHexValues(hexValues)
  }, [])

  return (
    <div className="space-y-8">
        {/* Style Overview & Icons */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription className="line-clamp-2">
                Preview das cores e tipografia do tema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-3">
                {[
                  "--background",
                  "--foreground",
                  "--primary",
                  "--secondary",
                  "--muted",
                  "--accent",
                  "--border",
                  "--chart-1",
                  "--chart-2",
                  "--chart-3",
                  "--chart-4",
                  "--chart-5",
                ].map((variant) => (
                  <div
                    key={variant}
                    className="flex flex-col flex-wrap items-center gap-2"
                  >
                    <div
                      className="relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
                      style={
                        {
                          "--color": `var(${variant})`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="hidden max-w-14 truncate font-mono text-[0.55rem] text-muted-foreground md:block">
                        {variant.replace('--', '')}
                      </div>
                      <div className="font-mono text-[0.65rem] font-medium">
                        {colorHexValues[variant] || '...'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons</CardTitle>
              <CardDescription>Hugeicons com stroke width 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 place-items-center gap-4">
                {[
                  Copy01Icon, AlertCircleIcon, Delete02Icon, Share03Icon,
                  ShoppingBag01Icon, MoreHorizontalCircle01Icon, Loading03Icon, PlusSignIcon,
                  MinusSignIcon, ArrowLeft02Icon, ArrowRight02Icon, Tick02Icon,
                  ArrowDown01Icon, ArrowRight01Icon, Search01Icon, Settings01Icon,
                ].map((Icon, i) => (
                  <Card key={i} className="flex size-8 items-center justify-center rounded-md p-0 ring ring-border *:[svg]:size-4">
                    <HugeiconsIcon icon={Icon} strokeWidth={2} />
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Todas as variantes e tamanhos de botoes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Variants */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Icon Buttons</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="icon-xs" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon-sm" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">With Icons</p>
              <div className="flex flex-wrap gap-2">
                <Button>
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} data-icon="inline-start" />
                  Email
                </Button>
                <Button variant="secondary">
                  Download
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
                <Button variant="outline">
                  <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} data-icon="inline-start" className="animate-spin" />
                  Loading
                </Button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Disabled</p>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Default</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="outline" disabled>Outline</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Group */}
        <Card>
          <CardHeader>
            <CardTitle>Button Group</CardTitle>
            <CardDescription>Agrupamento de botoes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="outline">
                  <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
                </Button>
                <Button variant="outline">
                  <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button>Actions</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon">
                      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Option 1</DropdownMenuItem>
                    <DropdownMenuItem>Option 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Badge */}
        <Card>
          <CardHeader>
            <CardTitle>Badge</CardTitle>
            <CardDescription>Todas as variantes de badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} data-icon="inline-start" />
                Verified
              </Badge>
              <Badge variant="secondary">
                <HugeiconsIcon icon={StarIcon} strokeWidth={2} data-icon="inline-start" />
                Featured
              </Badge>
              <Badge variant="outline">
                New
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-end" />
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Default e Line variants, horizontal e vertical</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Horizontal */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Default (Horizontal)</p>
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4 rounded-lg border p-4">
                  Account settings content
                </TabsContent>
                <TabsContent value="password" className="mt-4 rounded-lg border p-4">
                  Password settings content
                </TabsContent>
                <TabsContent value="settings" className="mt-4 rounded-lg border p-4">
                  General settings content
                </TabsContent>
              </Tabs>
            </div>

            {/* Line Variant */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Line Variant</p>
              <Tabs defaultValue="overview">
                <TabsList variant="line">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 rounded-lg border p-4">
                  Overview content
                </TabsContent>
                <TabsContent value="analytics" className="mt-4 rounded-lg border p-4">
                  Analytics content
                </TabsContent>
                <TabsContent value="reports" className="mt-4 rounded-lg border p-4">
                  Reports content
                </TabsContent>
              </Tabs>
            </div>

            {/* Vertical */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Vertical</p>
              <Tabs defaultValue="profile" orientation="vertical" className="flex gap-4">
                <TabsList>
                  <TabsTrigger value="profile">
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} data-icon="inline-start" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} data-icon="inline-start" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} data-icon="inline-start" />
                    Security
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1">
                  <TabsContent value="profile" className="rounded-lg border p-4">
                    Profile settings content
                  </TabsContent>
                  <TabsContent value="notifications" className="rounded-lg border p-4">
                    Notification preferences
                  </TabsContent>
                  <TabsContent value="security" className="rounded-lg border p-4">
                    Security settings
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Toggle & Toggle Group */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>Toggle buttons e toggle groups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Single Toggles */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Single Toggle</p>
              <div className="flex flex-wrap gap-2">
                <Toggle aria-label="Toggle bold">
                  <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle italic">
                  <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
                </Toggle>
                <Toggle aria-label="Toggle underline" defaultPressed>
                  <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
                </Toggle>
              </div>
            </div>

            {/* Toggle Group - Single */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Group (Single)</p>
              <ToggleGroup type="single" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <HugeiconsIcon icon={TextAlignLeftIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <HugeiconsIcon icon={TextAlignCenterIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <HugeiconsIcon icon={TextAlignRightIcon} strokeWidth={2} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Toggle Group - Multiple */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Group (Multiple)</p>
              <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Toggle Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Toggle Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle size="sm" aria-label="Small">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
                <Toggle size="default" aria-label="Default">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
                <Toggle size="lg" aria-label="Large">
                  <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
                </Toggle>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Avatars, grupos e badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sizes */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Sizes</p>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Fallback */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Fallback</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* With Badge */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">With Badge</p>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge>
                    <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
                  </AvatarBadge>
                </Avatar>
              </div>
            </div>

            {/* Avatar Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Avatar Group</p>
              <AvatarGroup>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>+5</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>Inputs, checkboxes, radios, switches e sliders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input */}
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="email@example.com" />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="Enter password" />
              </Field>
            </FieldGroup>

            {/* Input Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Input Group</p>
              <FieldGroup>
                <Field>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search..." />
                  </InputGroup>
                </Field>
                <Field>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="example.com" />
                  </InputGroup>
                </Field>
              </FieldGroup>
            </div>

            {/* Textarea */}
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea placeholder="Type your message here..." className="resize-none" />
            </Field>

            {/* Checkbox */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Checkbox</p>
              <div className="flex gap-4">
                <Checkbox id="terms" />
                <Checkbox id="newsletter" defaultChecked />
                <Checkbox id="disabled" disabled />
                <Checkbox id="disabled-checked" disabled defaultChecked />
              </div>
            </div>

            {/* Radio Group */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Radio Group</p>
              <RadioGroup defaultValue="option-1" className="flex gap-4">
                <RadioGroupItem value="option-1" />
                <RadioGroupItem value="option-2" />
                <RadioGroupItem value="option-3" />
              </RadioGroup>
            </div>

            {/* Switch */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Switch</p>
              <div className="flex gap-4">
                <Switch />
                <Switch defaultChecked />
                <Switch disabled />
                <Switch disabled defaultChecked />
              </div>
            </div>

            {/* Slider */}
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Slider</p>
              <Slider
                value={sliderValue}
                onValueChange={handleSliderValueChange}
                max={1000}
                min={0}
                step={10}
                className="w-full max-w-md"
                aria-label="Slider"
              />
              <p className="mt-2 text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Progress bar indicator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={progressValue} />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              </Button>
              <span className="ml-2 text-sm text-muted-foreground">{progressValue}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
            <CardDescription>Default e Destructive variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Alert Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialog</CardTitle>
            <CardDescription>Modal de confirmacao</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Show Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    All your data will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Dropdown Menu */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Menu dropdown com grupos e separadores</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open Menu
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={Notification02Icon} strokeWidth={2} />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Item */}
        <Card>
          <CardHeader>
            <CardTitle>Item</CardTitle>
            <CardDescription>List items com diferentes variantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Item>
              <ItemContent>
                <ItemTitle>Default Item</ItemTitle>
                <ItemDescription>This is a default item with description.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="secondary">Action</Button>
              </ItemActions>
            </Item>

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Outline Item</ItemTitle>
                <ItemDescription>Item with outline variant.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">Edit</Button>
              </ItemActions>
            </Item>

            <Item variant="muted">
              <ItemContent>
                <ItemTitle>Muted Item</ItemTitle>
                <ItemDescription>Item with muted background.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch />
              </ItemActions>
            </Item>
          </CardContent>
        </Card>

        {/* Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
            <CardDescription>Loading placeholders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>

        {/* Separator */}
        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>Horizontal e vertical separators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm">Content above separator</p>
              <Separator className="my-4" />
              <p className="text-sm">Content below separator</p>
            </div>
            <div className="flex h-6 items-center gap-4">
              <span className="text-sm">Item 1</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Item 2</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Item 3</span>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Card Variations</CardTitle>
            <CardDescription>Diferentes layouts de cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Simple Card</CardTitle>
                  <CardDescription>Basic card layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">With Avatar</CardTitle>
                    <CardDescription>Card with avatar header</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">User profile card example.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">With Badge</CardTitle>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <CardDescription>Card with badge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Featured content card.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Charts</h2>
          <p className="mt-2 text-muted-foreground">Graficos com Recharts e ChartContainer</p>
        </div>

        {/* Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Visualizacao de dados com area preenchida</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                desktop: {
                  label: "Desktop",
                  color: "var(--chart-1)",
                },
                mobile: {
                  label: "Mobile",
                  color: "var(--chart-2)",
                },
              } satisfies ChartConfig}
              className="h-[300px] w-full"
            >
              <AreaChart
                data={[
                  { month: "Jan", desktop: 186, mobile: 80 },
                  { month: "Feb", desktop: 305, mobile: 200 },
                  { month: "Mar", desktop: 237, mobile: 120 },
                  { month: "Apr", desktop: 73, mobile: 190 },
                  { month: "May", desktop: 209, mobile: 130 },
                  { month: "Jun", desktop: 214, mobile: 140 },
                ]}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Grafico de barras com multiplas series</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "var(--chart-1)",
                },
                expenses: {
                  label: "Expenses",
                  color: "var(--chart-3)",
                },
              } satisfies ChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                data={[
                  { month: "Jan", revenue: 4500, expenses: 3200 },
                  { month: "Feb", revenue: 5200, expenses: 3800 },
                  { month: "Mar", revenue: 4800, expenses: 4100 },
                  { month: "Apr", revenue: 6100, expenses: 4500 },
                  { month: "May", revenue: 5800, expenses: 4200 },
                  { month: "Jun", revenue: 7200, expenses: 5100 },
                ]}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>Grafico de linhas para tendencias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                visitors: {
                  label: "Visitors",
                  color: "var(--chart-2)",
                },
                pageViews: {
                  label: "Page Views",
                  color: "var(--chart-4)",
                },
              } satisfies ChartConfig}
              className="h-[300px] w-full"
            >
              <LineChart
                data={[
                  { day: "Mon", visitors: 1200, pageViews: 3400 },
                  { day: "Tue", visitors: 1400, pageViews: 4100 },
                  { day: "Wed", visitors: 1100, pageViews: 2900 },
                  { day: "Thu", visitors: 1800, pageViews: 5200 },
                  { day: "Fri", visitors: 2100, pageViews: 6100 },
                  { day: "Sat", visitors: 900, pageViews: 2400 },
                  { day: "Sun", visitors: 750, pageViews: 1800 },
                ]}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="var(--color-pageViews)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie and Radial Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pie Chart</CardTitle>
              <CardDescription>Distribuicao de categorias</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  chrome: { label: "Chrome", color: "var(--chart-1)" },
                  safari: { label: "Safari", color: "var(--chart-2)" },
                  firefox: { label: "Firefox", color: "var(--chart-3)" },
                  edge: { label: "Edge", color: "var(--chart-4)" },
                  other: { label: "Other", color: "var(--chart-5)" },
                } satisfies ChartConfig}
                className="mx-auto aspect-square h-[280px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={[
                      { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                      { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                      { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                      { browser: "other", visitors: 90, fill: "var(--color-other)" },
                    ]}
                    dataKey="visitors"
                    nameKey="browser"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                  />
                  <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radial Bar Chart</CardTitle>
              <CardDescription>Progresso em formato radial</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  safari: { label: "Safari", color: "var(--chart-2)" },
                } satisfies ChartConfig}
                className="mx-auto aspect-square h-[280px]"
              >
                <RadialBarChart
                  data={[{ browser: "safari", visitors: 73, fill: "var(--color-safari)" }]}
                  startAngle={90}
                  endAngle={90 + 73 * 3.6}
                  innerRadius={80}
                  outerRadius={140}
                >
                  <RadialBar dataKey="visitors" background cornerRadius={10} />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold">
                    73%
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Tables</h2>
          <p className="mt-2 text-muted-foreground">Tabelas com diferentes estilos</p>
        </div>

        {/* Basic Table */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Table</CardTitle>
            <CardDescription>Tabela simples com dados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><Badge variant="secondary">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV004</TableCell>
                  <TableCell><Badge variant="secondary">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$450.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right font-bold">$1,200.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        {/* Mixed: Chart + Table */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Mixed Components</h2>
          <p className="mt-2 text-muted-foreground">Combinacoes de graficos e tabelas</p>
        </div>

        {/* Sales Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Dashboard</CardTitle>
            <CardDescription>Visao geral de vendas com grafico e tabela</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chart Section */}
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "var(--chart-1)",
                },
              } satisfies ChartConfig}
              className="h-[200px] w-full"
            >
              <BarChart
                data={[
                  { product: "Widget A", sales: 4500 },
                  { product: "Widget B", sales: 3200 },
                  { product: "Widget C", sales: 5800 },
                  { product: "Widget D", sales: 2100 },
                  { product: "Widget E", sales: 6700 },
                ]}
                layout="vertical"
                margin={{ left: 80, right: 12 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="product"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>

            <Separator />

            {/* Table Section */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Widget A</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$4,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Widget B</TableCell>
                  <TableCell>Hardware</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">45%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$3,200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Widget C</TableCell>
                  <TableCell>Software</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={90} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">90%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$5,800</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Widget D</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$2,100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Widget E</TableCell>
                  <TableCell>Premium</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">60%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$6,700</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Stat Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">$45,231.89</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4 text-green-500" />
                <span className="text-green-500">+20.1%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-3xl">+2,350</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4 text-green-500" />
                <span className="text-green-500">+180.1%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-3xl">+12,234</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4 text-green-500" />
                <span className="text-green-500">+19%</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overview with Chart and Recent Sales Table */}
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: {
                    label: "Total",
                    color: "var(--chart-1)",
                  },
                } satisfies ChartConfig}
                className="h-[300px] w-full"
              >
                <BarChart
                  data={[
                    { name: "Jan", total: 1800 },
                    { name: "Feb", total: 2400 },
                    { name: "Mar", total: 1900 },
                    { name: "Apr", total: 3200 },
                    { name: "May", total: 2800 },
                    { name: "Jun", total: 3600 },
                    { name: "Jul", total: 3100 },
                    { name: "Aug", total: 2900 },
                    { name: "Sep", total: 4200 },
                    { name: "Oct", total: 3800 },
                    { name: "Nov", total: 4600 },
                    { name: "Dec", total: 5200 },
                  ]}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Olivia Martin", email: "olivia@email.com", amount: "+$1,999.00", avatar: "OM" },
                { name: "Jackson Lee", email: "jackson@email.com", amount: "+$39.00", avatar: "JL" },
                { name: "Isabella Nguyen", email: "isabella@email.com", amount: "+$299.00", avatar: "IN" },
                { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "WK" },
                { name: "Sofia Davis", email: "sofia@email.com", amount: "+$39.00", avatar: "SD" },
              ].map((sale, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Avatar size="sm">
                    <AvatarFallback>{sale.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="font-medium">{sale.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Table with Sparklines */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Metricas com mini graficos inline</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { metric: "Page Views", current: "12.4K", change: "+12.5%", status: "success", data: [10, 12, 8, 15, 11, 14, 16] },
                  { metric: "Bounce Rate", current: "42.3%", change: "-3.2%", status: "success", data: [45, 43, 44, 42, 41, 43, 42] },
                  { metric: "Session Duration", current: "3m 24s", change: "+8.1%", status: "success", data: [180, 190, 185, 200, 195, 210, 204] },
                  { metric: "Conversion Rate", current: "2.8%", change: "-0.5%", status: "warning", data: [3.2, 3.0, 2.9, 2.8, 2.7, 2.9, 2.8] },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell>
                      <ChartContainer
                        config={{ value: { label: "Value", color: item.status === "success" ? "var(--chart-2)" : "var(--chart-4)" } }}
                        className="h-8 w-24"
                      >
                        <LineChart data={item.data.map((v, idx) => ({ idx, value: v }))} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                          <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ChartContainer>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "success" ? "secondary" : "outline"}>
                        {item.status === "success" ? "Good" : "Attention"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={item.change.startsWith("+") ? "text-green-600" : item.change.startsWith("-") && item.status === "success" ? "text-green-600" : "text-amber-600"}>
                        {item.change}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  )
}
