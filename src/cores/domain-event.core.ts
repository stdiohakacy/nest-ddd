export interface DomainEvent {
  eventName: string;
  timestamp: Date;
  payload: any;
}

export class EventPublisher {
  // Map of event name to an array of subscriber functions
  private static subscribers: Map<string, Function[]> = new Map();

  // Publish an event to all subscribers
  public static publish(event: DomainEvent): void {
    const eventName = event.eventName;
    const handlers = this.subscribers.get(eventName) || [];

    handlers.forEach((handler) => {
      handler(event.payload); // Notify each handler with the event's payload
    });

    console.log(`Event ${eventName} published with payload: `, event.payload);
  }

  // Subscribe to a specific event
  public static subscribe(
    eventName: string,
    handler: (payload: any) => void,
  ): void {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    this.subscribers.get(eventName)!.push(handler);
    console.log(`Subscribed to event: ${eventName}`);
  }

  // Optionally, we can allow unsubscription from events
  public static unsubscribe(
    eventName: string,
    handler: (payload: any) => void,
  ): void {
    if (!this.subscribers.has(eventName)) return;

    this.subscribers.set(
      eventName,
      this.subscribers.get(eventName)!.filter((h) => h !== handler),
    );
    console.log(`Unsubscribed from event: ${eventName}`);
  }
}
