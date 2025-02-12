interface Query {
    _id?: { $in: string[]; };
    $text?: { $search: string; };
    success?: boolean;
}

export interface Sort {
    [key: string]: 'desc' | 'asc';
};

export interface Options {
    populate?: string[];
    sort?: Sort;
    page?: number;
    limit?: number;
    searchTerm?: string;
}
export interface GetManyOptions {
    ids: string[];
    options: Options;
}

export interface ApiRequest {
    query?: Query;
    options?: Options;
}

interface Patch {
    small: string | null;
    large: string | null;
}

interface Reddit {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
}

interface Flickr {
    small: string[];
    original: string[];
}

interface Links {
    patch: Patch;
    reddit: Reddit;
    flickr: Flickr;
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
}

interface Height {
    meters: number;
    feet: number;
}

interface Diameter {
    meters: number;
    feet: number;
}

interface Mass {
    kg: number;
    lb: number;
}

interface ThrustSeaLevel {
    kN: number;
    lbf: number;
}

interface ThrustVacuum {
    kN: number;
    lbf: number;
}

interface FirstStage {
    thrust_sea_level: ThrustSeaLevel;
    thrust_vacuum: ThrustVacuum;
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number | null;
}

interface Thrust {
    kN: number;
    lbf: number;
}

interface CompositeFairing {
    height: Height;
    diameter: Diameter;
}

interface Payloads {
    composite_fairing: CompositeFairing;
    option_1: string;
}

interface SecondStage {
    thrust: Thrust;
    payloads: Payloads;
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number | null;
}

interface Isp {
    sea_level: number;
    vacuum: number;
}

interface Engines {
    isp: Isp;
    thrust_sea_level: ThrustSeaLevel;
    thrust_vacuum: ThrustVacuum;
    number: number;
    type: string;
    version: string;
    layout: string | null;
    engine_loss_max: number | null;
    propellant_1: string;
    propellant_2: string;
    thrust_to_weight: number;
}

interface LandingLegs {
    number: number;
    material: string | null;
}

interface PayloadWeight {
    id: string;
    name: string;
    kg: number;
    lb: number;
}

interface Rocket {
    height: Height;
    diameter: Diameter;
    mass: Mass;
    first_stage: FirstStage;
    second_stage: SecondStage;
    engines: Engines;
    landing_legs: LandingLegs;
    payload_weights: PayloadWeight[];
    flickr_images: string[];
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    wikipedia: string;
    description: string;
    id: string;
}

interface Core {
    core: string | null;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
}


interface Images {
    large: string[];
}

interface Launchpad {
    images: Images;
    name: string,
    full_name: string,
    locality: string,
    region: string,
    latitude: number,
    longitude: number,
    launch_attempts: number,
    launch_successes: number,
    rockets: string[],
    timezone: string,
    launches: string[],
    status: string,
    details: string,
    id: string,
}

export interface Failure {
    time: number;
    altitude: number;
    reason: string;
}

export interface Launch {
    fairings: {
        reused: boolean | null;
        recovery_attempt: boolean | null;
        recovered: boolean | null;
        ships: string[];
    } | null;
    links: Links;
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: number | null;
    rocket: Rocket;
    success: boolean;
    failures: Failure[];
    details: string | null;
    crew: string[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: Launchpad;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string | null;
    id: string;
}

export interface SpaceXData {
    docs: Launch[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}