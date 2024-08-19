import ical from 'node-ical';
import { createEvent, EventAttributes } from 'ics';

export function parseICS(params: string) {
	return new Promise((resolve, reject) => {
		ical.async.parseICS(params, (error, data) => (error ? reject(error) : resolve(data)));
	});
}

export type DateArray = [number, number, number, number, number] | [number, number, number, number] | [number, number, number];
export type DateTime = DateArray | number | string;

export type DurationObject = {
	weeks?: number;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
	before?: boolean;
};

export interface IEventOptions {
	/**
	 * 事件开始的日期和时间。
	 * @type { DateArray }
	 * @memberof IEvent
	 * @example [2021, 1, 1, 0, 0]
	 */
	start: DateTime;

	/**
	 * The duration of the event.
	 * @type { 'local' | 'utc' }
	 * @memberof IEvent
	 * @example [1, 0]
	 */
	startInputType: 'local' | 'utc';

	/**
	 * The end date of the event.
	 * @type { number[] }
	 * @memberof IEvent
	 * @example [2021, 1, 1, 0, 0]
	 */
	startOutputType: 'local' | 'utc';

	/**
	 * The end date of the event.
	 * @type { DateArray }
	 * @memberof IEvent
	 * @example [2021, 1, 1, 0, 0]
	 */
	end?: Date;

	duration: DurationObject;

	/**
	 * The duration of the event.
	 * @type { 'local' | 'utc' }
	 * @memberof IEvent
	 * @example [1, 0]
	 */
	endInputType?: 'local' | 'utc';

	/**
	 * The duration of the event.
	 * @type { 'local' | 'utc' }
	 * @memberof IEvent
	 * @example [1, 0]
	 */
	endOutputType?: 'local' | 'utc';

	/**
	 * 事件的标题。
	 * @type { string }
	 * @memberof IEvent
	 */
	title: string;

	/**
	 * 事件的描述。
	 * @type { string }
	 * @memberof IEvent
	 * @example 'Join us for some fun'
	 */
	description: string;

	/**
	 * 活动组织者
	 * @type { { name: string; email: string } }
	 * @memberof IEvent
	 * @example { name: 'John Doe', email: '' }
	 */
	organizer: {
		name: string;
		email: string;
	};

	/**
	 * 预定地点
	 * @type { string }
	 * @memberof IEvent
	 * @example 'Mountain Sun Pub and Brewery'
	 */
	location: string;

	/**
	 * 与事件关联的URL。
	 * @type { string }
	 * @memberof IEvent
	 * @example 'https://example.com'
	 */
	url: string;

	/**
	 * 地理坐标（纬度/经度）
	 * @type { { lat: number; lng: number } }
	 * @memberof IEvent
	 * @example { lat: 51.05, lng: -0.09 }
	 */
	geo?: {
		lat: number;
		lon: number;
	};

	/**
	 * 与事件关联的分类。
	 * @type { string[] }
	 * @memberof IEvent
	 * @example ['PRIVATE', 'CONFIDENTIAL']
	 */
	categories: string[];

	/**
	 * 事件的状态。
	 * TENTATIVE暂定 CONFIRMED确认 CANCELLED取消
	 * @type { 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED' }
	 * @memberof IEvent
	 * @example 'CONFIRMED'
	 */
	status: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';

	/**
	 * 事件的重复规则。
	 * @type { string }
	 * @memberof IEvent
	 * @example 'FREQ=WEEKLY;COUNT=10;WKST=SU'
	 */
	productId: string;

	/**
	 * 此属性定义与日历对象关联的iCalendar对象方法。
	 * 在MIME消息实体中使用时，此属性的值必须与Content-Type“method”参数值相同。
	 * 如果指定了“METHOD”属性或内容类型“METHOD”参数，则还必须指定另一个。
	 * @type { string }
	 * @memberof IEvent
	 * @example 'FREQ=WEEKLY;COUNT=10;WKST=SU'
	 */
	method: string;

	/**
	 * 事件的通用唯一id，默认情况下使用nanoid生成。
	 * 警告：此值必须全局唯一。
	 * 建议遵循RFC 822地址规范（即。localpart@domain).
	 * 包含@domain的一半是确保唯一性的好方法。
	 * @type { string }
	 * @memberof IEvent
	 * @example 'LZfXLFzPPR4NNrgjlWDxn'
	 */
	uid: string;
}


class IEvent {


	constructor(options: IEventOptions) {
		this.start = options.start;
		this.startInputType = options.startInputType;
		this.startOutputType = options.startOutputType;
		this.end = options.end;
		this.duration = options.duration;
		this.endInputType = options.endInputType;
		this.endOutputType = options.endOutputType;
		this.title = options.title;
		this.description = options.description;
		this.organizer = options.organizer;
		this.location = options.location;
		this.url = options.url;
		this.geo = options.geo;
		this.categories = options.categories;
		this.status = options.status;
		this.productId = options.productId;
		this.method = options.method;
		this.uid = options.uid;
	
	}

}

interface IEventAttributes {
	start: DateTime;
	startInputType?: 'local' | 'utc';
	startOutputType?: 'local' | 'utc';

	endInputType?: 'local' | 'utc';
	endOutputType?: 'local' | 'utc';

	title?: string;
	description?: string;

	location?: string;
	geo?: GeoCoordinates;

	url?: string;
	status?: EventStatus;
	busyStatus?: 'FREE' | 'BUSY' | 'TENTATIVE' | 'OOF';
	transp?: 'TRANSPARENT' | 'OPAQUE';

	organizer?: Person & {
		sentBy?: string;
	};
	attendees?: Attendee[];

	categories?: string[];
	alarms?: Alarm[];

	productId?: HeaderAttributes['productId'];
	uid?: string;
	method?: HeaderAttributes['method'];
	recurrenceRule?: string;
	exclusionDates?: string;
	sequence?: number;
	calName?: HeaderAttributes['calName'];
	classification?: classificationType;
	created?: DateTime;
	lastModified?: DateTime;
	htmlContent?: string;
}

export function creactICS(event: IEvent) {
	return new Promise((resolve, reject) => {
		createEvent(event, (error, value) => (error ? reject(error) : resolve(value)));
	});
}
